import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { dashboardValidation } from "../../utilities/validation/dashboardValidation.js";
import { matchedData, validationResult } from "express-validator";
import Course from "../../utilities/schemas/Course.js";

const router = Router();

router.post(
  "/api/addcourse",
  dashboardValidation,
  tryCatch(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg = errors
        .array()
        .map((e) => e.msg)
        .join(",");
      return next(new AppError(msg, 400, true));
    }
    let data = matchedData(req);
    let newCourse = new Course(data);
    let savedCourse = await newCourse.save();
    console.log(newCourse)
    res.status(201).json({ success: true });
  })
);

export default router;
