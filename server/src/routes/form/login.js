import { Router } from "express";
import { loginValidation } from "../../utilities/validation/validation.js";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import User from "../../utilities/schemas/User.js";
import AppError from "../../errorHandling/classObject.js";
import { compareHashing } from "../../utilities/hashing/hasher.js";
import { matchedData, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/api/login",
  loginValidation,
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
    let userFromDatabase = await User.findOne({ email: data.email }).select(
      "+password"
    );
    if (!userFromDatabase)
      return next(new AppError("There is no user with this Email", 400, true));

    if (!(await compareHashing(data.password, userFromDatabase.password)))
      return next(new AppError("Password doesn't match", 401, true));
    let userId = userFromDatabase._id;
    // 1. Create the Access Token (short-lived)
    const accessToken = jwt.sign(
      { id: userId },
      process.env.SECRET_WEB_TOKEN,
      { expiresIn: "1h" } // Expires in 1 hour
    );

    // 2. Create the Refresh Token (long-lived)
    const refreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_SECRET_WEB_TOKEN,
      { expiresIn: "7d" } // Expires in 7 days
    );
    // Set the Access Token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Use secure in production
      expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
      sameSite: "lax",
    });

    // Set the Refresh Token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
      sameSite: "lax",
    });

    res.status(200).json({ success: true });
  })
);

export default router;
