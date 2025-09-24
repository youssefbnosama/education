import { Router } from "express";
import profile from "./profile.js"

const router = Router();

router.use(profile)

export default router