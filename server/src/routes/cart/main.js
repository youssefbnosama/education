import { Router } from "express";
import addToCart from "./addToCart.js";
import getCartItems from "./getCartItems.js";
import payOrder from "./payorder.js";
import declineOrder from "./declineOrder.js";
import payments from "./payments.js";

const router = Router();

router.use(addToCart);
router.use(getCartItems);
router.use(payOrder);
router.use(declineOrder);
router.use(payments);

export default router;
