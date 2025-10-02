import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { addContentValidation } from "../../utilities/validation/contentValidation.js";
import { matchedData, validationResult } from "express-validator";
import Week from "../../utilities/schemas/Week.js";

const router = Router();

router.post(
  "/api/dashboard/weeks/:weekid/addcontent",
  addContentValidation,
  tryCatch(async (req, res, next) => {
    const { weekid } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg = errors
        .array()
        .map((e) => e.msg)
        .join(",");
      return next(new AppError(msg, 400, true));
    }
    const week = await Week.findById(weekid);
    if (!week) {
      return next(new AppError("Week not found", 404, true));
    }

    let data = matchedData(req);

    week.contents.push(data);

    await week.save();

    res.status(201).json({ success: true });
  })
);

export default router;
