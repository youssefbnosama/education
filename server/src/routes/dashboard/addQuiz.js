import fs from "fs";
import xlsx from "xlsx";
import upload from "../../utilities/multer.js";
import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { body, validationResult } from "express-validator";
import Week from "../../utilities/schemas/Week.js";

const router = Router();

const requiredHeaders = [
  "QuestionTitle",
  "OptionA_Title",
  "OptionB_Title",
  "OptionC_Title",
  "OptionD_Title",
  "CorrectAnswer",
];

router.post(
  "/api/dashboard/weeks/:weekid/addquiz",
  upload.single("file"),
  body("type").notEmpty().withMessage("Type must be quiz"),
  body("title").notEmpty().withMessage("Title must not be Empty"),
  tryCatch(async (req, res, next) => {
    if (!req.file) return next(new AppError("File is required", 400, true));
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return next(new AppError(errs.array()[0].msg, 400, true));
    // اقرأ الـ Excel
    let workbook;
    try {
      workbook = xlsx.readFile(req.file.path);
    } catch (err) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return next(new AppError("Unable to read Excel file", 400, true));
    }

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return next(new AppError("Excel has no sheets", 400, true));
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    // احذف الصفوف الفاضية
    const filteredRows = rows.filter((r) =>
      Object.values(r).some((v) => v !== "" && v !== null && v !== undefined)
    );

    if (!filteredRows.length) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return next(new AppError("Excel sheet is empty", 400, true));
    }

    // تحقق من وجود الأعمدة المطلوبة
    const headersInFile = Object.keys(filteredRows[0]);
    const missing = requiredHeaders.filter((h) => !headersInFile.includes(h));
    if (missing.length) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return next(
        new AppError(
          `Missing required columns: ${missing.join(", ")}`,
          400,
          true
        )
      );
    }

    // تحقق من صحة البيانات
    const errors = [];
    filteredRows.forEach((row, idx) => {
      const rowNum = idx + 2; // header في الصف 1

      if (!String(row.QuestionTitle || "").trim()) {
        errors.push({
          row: rowNum,
          field: "QuestionTitle",
          message: "Question title is required",
        });
      }

      ["A", "B", "C", "D"].forEach((letter) => {
        const key = `Option${letter}_Title`;
        if (!String(row[key] || "").trim()) {
          errors.push({
            row: rowNum,
            field: key,
            message: `${key} is required`,
          });
        }
      });

      const corr = String(row.CorrectAnswer || "")
        .trim()
        .toLowerCase();
      if (!corr || !/^[abcd]$/.test(corr)) {
        errors.push({
          row: rowNum,
          field: "CorrectAnswer",
          message: "CorrectAnswer must be one of: a, b, c, d",
        });
      } else {
        const optionKey = `Option${corr.toUpperCase()}_Title`;
        if (!String(row[optionKey] || "").trim()) {
          errors.push({
            row: rowNum,
            field: "CorrectAnswer",
            message: `CorrectAnswer points to ${optionKey} but that option title is empty`,
          });
        }
      }
    });

    if (errors.length) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // جهز البيانات
    const quizQuestions = filteredRows.map((row) => ({
      title: String(row.QuestionTitle).trim(),
      options: [
        { title: String(row.OptionA_Title).trim() },
        { title: String(row.OptionB_Title).trim() },
        { title: String(row.OptionC_Title).trim() },
        { title: String(row.OptionD_Title).trim() },
      ],
      correctAnswer: String(row.CorrectAnswer).trim().toLowerCase(), // 'a'|'b'|'c'|'d'
    }));

    // احذف الملف بعد الاستخدام
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    let data = {
      quiz: quizQuestions,
      type: "quiz",
      quizLength: +quizQuestions.length,
      title: req.body.title,
    };
    let theWeek = await Week.findById(req.params.weekid);
    if (!theWeek) return next(new AppError("There is no week", 400, true));

    theWeek.contents.push(data);

    await theWeek.save();

    return res.json({
      message: "Excel validated and parsed",
      count: quizQuestions.length,
      preview: quizQuestions.slice(0, 5),
    });
  })
);

export default router;
