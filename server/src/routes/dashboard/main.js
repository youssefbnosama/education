import { Router } from "express";
import addCourse from "./addCourse.js";
import getWeekNumber from "./getWeekNumber.js"

const router = Router();

router.use(addCourse)
router.use(getWeekNumber)

export default router