import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";


const workflowROUTER = Router();

workflowROUTER.post('/subscription/reminder', sendReminders)



export default workflowROUTER;