import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import UserQuiz from "../../utilities/schemas/Quiz.js";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import { validateUserQuiz } from "../../utilities/validation/quizValidation.js";
import { matchedData, validationResult } from "express-validator";

const router = Router();

router.post(
  "/api/postquiz",
  authMiddleware,
  validateUserQuiz,
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
    let score = 0;
    data.data.forEach((e) => {
      if (e.selected === e.correctAnswer) {
        score += 1;
      }
    });
    data.score = score;
    let newUserQuiz = new UserQuiz(data);
    let savedUserQuiz = await newUserQuiz.save();
    res.status(201).json({ success: true });
  })
);

export default router;
