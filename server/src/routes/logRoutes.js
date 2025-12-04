import express from "express";
import auth from "../middleware/authMiddleware.js";
import MessLog from "../models/MessLog.js";

const router = express.Router();

router.add("/add", auth, async (req, res) => {
  try {
    const { date, timesVisited, reason } = req.body;

    const log = await MessLog.findOne({ userId: req.user._id, date });

    if (log) {
      log.timesVisited = timesVisited;
      log.reason = reason || "";
      // the default value of reason is "" in the schema, but that only runs when a new document is created.
      // during an update, that default doesn’t apply anymore.
      // so if the user doesn’t send any reason, the value becomes undefined.
      // without the empty string fallback (reason || ""), we would end up saving undefined,
      // which can cause unexpected bugs. that’s why we add the empty string as a fallback.
      await log.save();
      return res.json({ message: "Log updated", log });
    }

    const newLog = await MessLog.create({
      userId: req.user._id,
      date,
      timesVisited,
      reason,
    });

    res.json({ message: "Log created", log: newLog });
  } catch (error) {
    res.status(500).json({ message: "Error saving log" });
  }
});

export default router;
