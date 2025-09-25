import { Router } from "express";
import showCourses from "./showCourses.js"

const router = Router();

router.use(showCourses)

export default router