import express from "express";
import auth from "../middleware/authMiddleware.js";
import MessLog from "../models/MessLog.js";

const router = express.Router();

router.get("/csv/:year/:month", auth, async (req, res) => {
  const { year, month } = req.params;
  const prefix = `${year}-${month.padStart(2, "0")}`;

  try {
    const logs = await MessLog.find({
      userId: req.user._id,
      date: { $regex: `^${prefix}` },
    }).sort({ date: 1 });

    let csv = "Date,Times Visited,Reason\n";

    logs.forEach((log) => {
      csv += `${log.date},${log.timesVisited},"${log.reason || ""}"\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment(`mess-logs-${prefix}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate CSV" });
  }
});

export default router;
