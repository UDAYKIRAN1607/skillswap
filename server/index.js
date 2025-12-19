// const connectDB = require("./config/db");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const authRoutes = require("./routes/authRoutes");
// import userRoutes from "./routes/userRoutes.js";

// const app = express();

// // connect database
// connectDB();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // Simple API route
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "SkillSwap backend is running ",
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import dotenv from "dotenv";
import express from "express";
import cors from "cors";


import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// connect database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "SkillSwap backend is running",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
