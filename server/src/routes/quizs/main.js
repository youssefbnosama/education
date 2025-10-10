import { Router } from "express";
import getQuiz from "./getQuiz.js";
import postQuiz from "./postQuiz.js"

const router = Router();

router.use(getQuiz);
router.use(postQuiz);

export default router;
