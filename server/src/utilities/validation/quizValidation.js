import { body } from "express-validator";
import mongoose from "mongoose";

export const validateUserQuiz = [
  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid userId"),

  body("weekId")
    .notEmpty()
    .withMessage("weekId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid weekId"),

  body("quizId")
    .notEmpty()
    .withMessage("quizId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid quizId"),

  body("data").isArray().withMessage("data must be an array"),
  body("title").notEmpty().withMessage("Title must not be Empty"),
  body("totalQuestions")
    .notEmpty()
    .withMessage("Total question must not be Empty"),
];
