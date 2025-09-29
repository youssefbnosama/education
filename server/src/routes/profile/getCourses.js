import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import AppError from "../../errorHandling/classObject.js";
import Order from "../../utilities/schemas/Cart.js";

const router = Router();

router.get(
  "/api/getcourses",
  authMiddleware,
  tryCatch(async (req, res, next) => {
    const completedOrders = await Order.find({
      userId: req.user.id,
      status: "Completed",
    }).populate("courseId");
    if (!completedOrders)
      return res.next(new AppError("There is no courses", 404, true));
    const courses = completedOrders.map((e)=> e.courseId)
    res.status(200).json(courses)
  })
);

export default router;
