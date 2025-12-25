import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", auth, getStats);

export default router;
