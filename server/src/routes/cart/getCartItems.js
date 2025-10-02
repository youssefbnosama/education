import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import Order from "../../utilities/schemas/Cart.js";

const router = Router();

router.get(
  "/api/cart",
  authMiddleware,
  tryCatch(async (req, res, next) => {
    let array = await Order.find({ userId: req.user.id,status:"Pending" }).populate("courseId");
    console.log(array)
    res.json({ courses: array.map((e)=> e.courseId)});
  })
);

export default router;
