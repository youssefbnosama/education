// validations/contentValidation.js
import { body } from "express-validator";

export const addContentValidation = [
  body("type")
    .notEmpty()
    .bail()
    .withMessage("Type is required")
    .isIn(["video", "pdf"])
    .bail()
    .withMessage("Type must be either 'video' or 'pdf'"),

  body("url")
    .notEmpty()
    .bail()
    .withMessage("URL is required")
    .isURL()
    .bail()
    .withMessage("Invalid URL format"),

  body("title")
    .notEmpty()
    .bail()
    .withMessage("Title is required")
];
