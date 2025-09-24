import signup from "./signup.js";
import login from "./login.js"
import { Router } from "express";

const router = Router();

router.use(signup);
router.use(login)

export default router