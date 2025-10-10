import { Router } from "express";
import getAllGrades from "./getAllGrades.js";
import getSpecificGrade from "./getSpecificGrade.js";

const router = Router();

router.use(getAllGrades);
router.use(getSpecificGrade);

export default router;
