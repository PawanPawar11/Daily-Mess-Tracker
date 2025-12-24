import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messRoutes from "./routes/messRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// auth routes
app.use("/api/auth", authRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
