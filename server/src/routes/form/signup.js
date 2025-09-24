import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { signupValidation } from "../../utilities/validation/validation.js";
import { matchedData, validationResult } from "express-validator";
import User from "../../utilities/schemas/User.js";
import { hashFunction } from "../../utilities/hashing/hasher.js";

const router = Router();

router.post(
  "/api/signup",
  signupValidation,
  tryCatch(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg = errors
        .array()
        .map((e) => e.msg)
        .join(",");
      return next(new AppError(msg, 401, true));
    }
    let data = matchedData(req);

    let checkEmailExists = await User.findOne({ email: data.email });
    if (checkEmailExists)
      return next(new AppError("This Email already Exists", 401, true));
    data.password = await hashFunction(data.password);

    let newUser = new User(data);
    let savedUser = newUser.save();

    res.status(201).json({ success: true });
  })
);


export default router