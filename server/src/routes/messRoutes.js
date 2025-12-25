import express from "express";
import auth from "../middleware/authMiddleware.js";
import Mess from "../models/Mess.js";

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  const { messName, startDate, totalThalis, amountPerThali } = req.body;

  try {
    let mess = await Mess.findOne({ userId: req.user._id });

    if (mess) {
      mess.messName = messName;
      mess.startDate = startDate;
      mess.totalThalis = totalThalis;
      mess.amountPerThali = amountPerThali;

      await mess.save();
      return res.json({ message: "Mess updated", mess });
    }

    const newMess = Mess.create({
      userId: req.user._id,
      messName,
      startDate,
      totalThalis,
      amountPerThali,
    });

    res.json({ message: "Mess created", mess: newMess });
  } catch (error) {
    res.status(500).json({ message: "Error saving mess details" });
  }
});

router.get("/details", auth, async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req.user._id });
    res.json(mess || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching mess details" });
  }
});

export default router;
