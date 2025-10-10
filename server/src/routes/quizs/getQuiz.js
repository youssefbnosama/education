import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import Week from "../../utilities/schemas/Week.js";
import {authMiddleware} from "../../utilities/tokens/accessToken.js"

const router = Router();

router.get(
  "/api/weeks/:weekid/getquiz/:quizid",
  authMiddleware,
  tryCatch(async (req, res, next) => {
    const { weekid, quizid } = req.params;

    let theWeek = await Week.findById(weekid);
    if (!theWeek) return next(new AppError("There is no week", 404, true));

    let quiz =  theWeek.contents.find((e) => e.id === quizid);
    if (!quiz) return next(new AppError("There is no quiz", 404, true));
    res.status(200).json({userId:req.user.id ,data: quiz });
  })
);

export default router;
