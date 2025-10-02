import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { validateWeek } from "../../utilities/validation/weekValidation.js";
import { matchedData, validationResult } from "express-validator";
import Week from "../../utilities/schemas/Week.js";

const router = Router();

router.post(
  "/api/dashboard/addweek/:courseid",
  validateWeek,
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
    let newWeek = new Week(data);
    let savedWeek = await newWeek.save();
    res.status(201).json({ success: true });
  })
);

export default router;
