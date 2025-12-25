import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createOrUpdateMess, getMessDetails } from "../controllers/messController.js";

const router = express.Router();

router.post("/create", auth, createOrUpdateMess);
router.get("/details", auth, getMessDetails);

export default router;
