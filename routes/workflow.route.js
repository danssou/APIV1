import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";


const workflowROUTER = Router();

workflowROUTER.post('/', sendReminders)



export default workflowROUTER;