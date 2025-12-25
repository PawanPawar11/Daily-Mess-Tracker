import express from "express";
import auth from "../middleware/authMiddleware.js";
import { addOrUpdateLog, getMonthlyLogs } from "../controllers/logController.js";

const router = express.Router();

router.post("/add", auth, addOrUpdateLog);
router.get("/month/:year/:month", auth, getMonthlyLogs);

export default router;
