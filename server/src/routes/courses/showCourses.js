import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import Course from "../../utilities/schemas/Course.js";

const router = Router();

router.post(
  "/api/courses/:sec",
  tryCatch(async (req, res, next) => {
    let secs = ["sec-1", "sec-2", "sec-3"];
    const {
      params: { sec },
    } = req;
    if (!secs.includes(sec))
      return next(new AppError("Not found", 404, true));
    let courses = await Course.find({ grade: sec });
    res.status(200).json(courses);
  })
);

export default router;
