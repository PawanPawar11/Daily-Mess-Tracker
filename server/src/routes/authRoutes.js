// kya karna hai:
// 1. pehle do routes banana hai → signup aur login
// 2. signup/login karte time userSchema import karna zaroori hai
// 3. jab signup ya login success ho jaye → us user ka JWT banana hai
// aur response me token + basic user info bhejna hai
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    res.json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: generateToken(newUser._id),
      // yaha me "user.id" pass nahi kar sakta kyuki user wala object abhi bana hi nahi hai
      // wo bas response ke andar define hua hai
      // isliye newUser._id se token banana padta hai
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing up" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

export default router;
