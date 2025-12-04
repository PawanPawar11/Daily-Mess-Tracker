import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  timesVisited: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },

  reason: {
    type: String,
    default: "",
  },
});

logSchema.index({ userId: 1, date: 1 }, { unique: true });

const MessLog = mongoose.model("MessLog", logSchema);

export default MessLog;
