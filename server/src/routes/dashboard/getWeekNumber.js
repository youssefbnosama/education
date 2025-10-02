import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import Course from "../../utilities/schemas/Course.js";

const router = Router();

router.get(
  "/api/dashboard/:courseid/weeknumber",
  tryCatch(async (req, res, next) => {
    const { courseid } = req.params;
    let course = await Course.findById(courseid);
    if (!course) return next(new AppError("There is no course", 404, true));
    console.log(course)
    let num = +course.weeks.length + 1;
    res.status(200).json({ num });
  })
);

export default router;
