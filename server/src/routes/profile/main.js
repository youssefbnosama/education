import { Router } from "express";
import profile from "./profile.js";
import getCourses from "./getCourses.js";

const router = Router();

router.use(profile);
router.use(getCourses);

export default router;
