// kya karna hai:
// 1. pehle do routes banana hai → signup aur login
// 2. signup/login karte time userSchema import karna zaroori hai
// 3. jab signup ya login success ho jaye → us user ka JWT banana hai
// aur response me token + basic user info bhejna hai
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
