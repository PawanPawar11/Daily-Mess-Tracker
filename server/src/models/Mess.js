import mongoose, { Types } from "mongoose";

const messSchema = new mongoose.Schema({
  userId: {
    type: Types.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  messName: {
    type: String,
    required: true,
    trim: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  totalThalis: {
    type: Number,
    required: true,
  },

  amountPerThali: {
    type: Number,
    required: true,
  },
});

const Mess = mongoose.model("Mess", messSchema);

export default Mess;
