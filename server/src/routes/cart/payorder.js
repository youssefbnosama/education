import { Router } from "express";
import { dashboardValidation } from "../../utilities/validation/dashboardValidation.js";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import {  validationResult } from "express-validator";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import AppError from "../../errorHandling/classObject.js";
import Order from "../../utilities/schemas/Cart.js";
import mongoose from "mongoose";
import User from "../../utilities/schemas/User.js";

const router = Router();

router.patch(
  "/api/payorder",
  authMiddleware,
  dashboardValidation,
  tryCatch(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new AppError("there is something wrong", 400, false));
    const id = req.body._id;
    const objectId = new mongoose.Types.ObjectId(id);
    let updatedOrder = await Order.findOneAndUpdate(
      { courseId: objectId },
      { status: "Completed" },
      { new: true }
    );
    let userCourses = [...req.user.courses, id];
    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { courses: userCourses },
      { new: true }
    );
    res.status(200).json({ success: true });
  })
);

export default router;
