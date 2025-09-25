import { body } from "express-validator";

export const dashboardValidation = [
  // Title (3–50 chars, letters, numbers, spaces, dashes)
  body("title")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be 3–50 characters long.")
    .matches(/^[a-zA-Z0-9\s\-]+$/)
    .withMessage("Title can only contain letters, numbers, spaces, or dashes."),

  // Image URL
  body("image")
    .matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)$/i)
    .withMessage("Please provide a valid image URL (jpg, png, gif, webp, svg)."),

  // Description (min 10 chars)
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long."),

  // Price (positive number, max 9999)
  body("price")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("Price must be a positive number (up to 2 decimals).")
    .custom((value) => Number(value) > 0)
    .withMessage("Price must be greater than 0.")
    .custom((value) => Number(value) <= 9999)
    .withMessage("Price cannot exceed 9999."),

  // Grade (must be chosen from Sec-1, Sec-2, Sec-3)
  body("grade")
    .notEmpty()
    .withMessage("You must choose a grade.")
    .isIn(["sec-1", "sec-2", "sec-3"])
    .withMessage("Invalid grade selection."),
];
