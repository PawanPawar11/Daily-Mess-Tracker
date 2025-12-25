import express from "express";
import auth from "../middleware/authMiddleware.js";
import { exportLogsCsv } from "../controllers/logController.js";

const router = express.Router();

router.get("/csv/:year/:month", auth, exportLogsCsv);

export default router;
