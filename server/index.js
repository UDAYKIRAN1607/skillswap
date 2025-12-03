const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// connect database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Simple API route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "SkillSwap backend is running ",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
