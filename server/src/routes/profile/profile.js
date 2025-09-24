import { Router } from "express";
import { authMiddleware } from "../../utilities/tokens/accessToken.js";
import { tryCatch } from "../../errorHandling/tryCatch.js";

const router = Router();

router.get(
  "/api/profile",
  authMiddleware,
  tryCatch(async (req, res, next) => {
    res.json(req.user)
  })
);

export default router;
