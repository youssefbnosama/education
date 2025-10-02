import { Router } from "express";
import getWeeks from "./getWeeks.js";

const router = Router();

router.use(getWeeks);

export default router;
