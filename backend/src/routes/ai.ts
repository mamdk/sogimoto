import express from "express";
import aiSummary from "../controllers/ai";
const router = express.Router();

router.post('/summary', aiSummary);

export default router