import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import Week from "../../utilities/schemas/Week.js";

const router = Router();

router.get(
  "/api/getweekandcourse/:weekid",
  tryCatch(async (req, res, next) => {
    const { weekid } = req.params;
    let theWeek = await Week.findById(weekid).populate("courseid").lean();
    if (!theWeek) return next(new AppError("There is no week", 404, true));
    res
      .status(200)
      .json({
        weekNumber: theWeek.priority,
        courseTitle: theWeek.courseid.title,
      });
  })
);

export default router;
