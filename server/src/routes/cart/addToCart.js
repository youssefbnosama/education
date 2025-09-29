import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import Course from "../../utilities/schemas/Course.js";
import Order from "../../utilities/schemas/Cart.js";

const router = Router();

router.post(
  "/api/addtocart",

  authMiddleware,
  tryCatch(async (req, res, next) => {
    const {
      body,
      user: { id },
    } = req;
    if (!body) return next(new AppError("Can't be empty", 400, true));

    let course = await Course.findById(body.id);

    if (!course) return next(new AppError("There is no course", 404, true));

    let doesOrderExist = await Order.findOne({
      userId: id,
      courseId: body.id,
      status: { $in: ["Pending", "Completed"] },
    });
    if (doesOrderExist)
      return next(
        new AppError("This Order already exists in the cart", 400, true)
      );

    let newOrder = new Order({ userId: id, courseId: body.id });

    let savedOrder = await newOrder.save();

    res.status(201).json({ success: true });
  })
);

export default router;
