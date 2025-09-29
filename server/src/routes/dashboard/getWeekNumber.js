import { Router } from "express";
import { tryCatch } from "../../errorHandling/tryCatch.js";
import AppError from "../../errorHandling/classObject.js";
import Course from "../../utilities/schemas/Course.js";

const router = Router();

router.get("/api/dashboard/:courseid/weeknumber",tryCatch(async(req,res,next)=>{
    
}));

export default router;
