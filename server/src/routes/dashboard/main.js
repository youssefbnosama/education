import { Router } from "express";
import addCourse from "./addCourse.js"

const router = Router();

router.use(addCourse)

export default router