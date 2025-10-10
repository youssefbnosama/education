import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import UserQuiz from "../../utilities/schemas/Quiz.js";

const router = Router();

router.get(
  "/api/grades",
  authMiddleware,
  tryCatch(async (req, res, next) => {
    let data = await UserQuiz.find({ userId: req.user._id });
    if (!data) return next(new AppError("There are not grades", 404, true));
    res.status(200).json(data)
  })
);

export default router;
