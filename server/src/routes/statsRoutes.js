import express from "express";
import auth from "../middleware/authMiddleware.js";
import Mess from "../models/Mess.js";
import MessLog from "../models/MessLog.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    // -----------------------------------------
    // FETCH USER MESS DETAILS
    // -----------------------------------------
    const mess = await Mess.findOne({ userId: req.user._id });

    if (!mess) {
      return res.status(404).json({ message: "No mess found" });
    }

    // -----------------------------------------
    // CALCULATE DAYS PASSED
    // -----------------------------------------
    const startDate = new Date(mess.startDate);
    const today = new Date();

    const diffMs = today - startDate;
    const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // -----------------------------------------
    // FETCH ALL LOGS TO CALCULATE THALIS USED
    // -----------------------------------------
    const logs = await MessLog.find({ userId: req.user._id });

    const thalisUsed = logs.reduce(
      (sum, entry) => sum + (entry.timesVisited || 0),
      0
    );

    // -----------------------------------------
    // CALCULATIONS
    // -----------------------------------------
    const thalisRemaining = mess.totalThalis - thalisUsed;

    const totalDays = mess.totalThalis / 2; // assuming 2 thalis max per day
    const daysRemaining = Math.ceil(totalDays - daysPassed);

    const amountSpent = thalisUsed * mess.amountPerThali;

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------
    res.json({
      messName: mess.messName,
      totalThalis: mess.totalThalis,
      thalisUsed,
      thalisRemaining,
      startDate: mess.startDate,
      daysPassed,
      daysRemaining,
      amountPerThali: mess.amountPerThali,
      amountSpent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating stats" });
  }
});

export default router;
