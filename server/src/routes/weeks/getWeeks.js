import Router from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import Week from "../../utilities/schemas/Week.js";
import mongoose from "mongoose";

const router = Router();

router.get(
  "/api/dashboard/courses/:courseid/getweeks",
  tryCatch(async (req, res, next) => {
    const { courseid } = req.params;
    const weeks = await Week.find({
      courseid: new mongoose.Types.ObjectId(courseid),
    });
    if (!weeks) return next(new AppError("There is no week", 404, true));
    res.status(200).json(weeks);
  })
);

export default router;
