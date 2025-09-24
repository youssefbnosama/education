import { body } from "express-validator";

export const signupValidation = [
  // 1. Username Validation
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .bail() // Stop if it's empty
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters long.")
    .bail() // Stop if the length is wrong
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username can only contain letters, numbers, and underscores."
    ),

  // 2. Email Validation
  body("email")
    .notEmpty()
    .withMessage("Email address is required.")
    .bail() // Stop if it's empty
    .isEmail()
    .withMessage("Please provide a valid email address."),

  // 3. Password Validation
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .bail() // Stop if it's empty
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("grade").notEmpty().withMessage("Please, choose your grade"),
];

export const loginValidation = [
  // 1. Email Validation
  body("email")
    .notEmpty()
    .withMessage("Email address is required.")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address."),

  // 2. Password Validation
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];
