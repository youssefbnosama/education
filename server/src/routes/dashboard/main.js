import { Router } from "express";
import addCourse from "./addCourse.js";
import getWeekNumber from "./getWeekNumber.js";
import addWeek from "./addWeek.js";
import getWeekAndCourse from "./getWeekAndCourse.js";
import addContent from "./addContent.js";
import addQuiz from "./addQuiz.js";

const router = Router();

router.use(addCourse);
router.use(getWeekNumber);
router.use(addWeek);
router.use(getWeekAndCourse);
router.use(addContent);
router.use(addQuiz);

export default router;
