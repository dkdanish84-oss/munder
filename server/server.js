import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import visitRoutes from "./routes/visit.js";

import profileRoutes from "./routes/profile.js";

import authRoutes from "./routes/auth.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:");
    console.error(err);
    process.exit(1);
  });



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/visit", visitRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Munder Backend Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
