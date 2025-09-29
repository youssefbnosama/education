import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import Order from "../../utilities/schemas/Cart.js";

const router = Router();

router.get(
  "/api/payments",
  authMiddleware,
  tryCatch(async (req, res, next) => {
    let array = await Order.find({ userId: req.user.id }).populate("courseId").lean();
    let courses = array.map((e) => ({ ...e.courseId, status: e.status,createdAt:e.createdAt }));
    console.log(courses)
    res.json(courses);
  })
);

export default router;
