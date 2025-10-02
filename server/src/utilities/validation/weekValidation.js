import { body } from "express-validator";

export const validateWeek = [
  body("priority")
    .isInt({ gt: 0 })
    .withMessage("priority must be a positive integer"),

  body("title")
    .isString()
    .withMessage("title must be a string")
    .notEmpty()
    .withMessage("title cannot be empty"),

  body("courseid")
    .isMongoId()
    .withMessage("courseId must be a valid MongoDB ObjectId"),
];
