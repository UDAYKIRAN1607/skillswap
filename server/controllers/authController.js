// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

// // POST /api/auth/signup
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, skills, bio, location } = req.body;

//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Name, email, and password are required" });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(409).json({ message: "Email already registered" });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       passwordHash,
//       skills: skills || [],
//       bio: bio || "",
//       location: location || "",
//     });

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(201).json({
//       message: "User created successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         skills: user.skills,
//         bio: user.bio,
//         location: user.location,
//       },
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // POST /api/auth/login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         skills: user.skills,
//         bio: user.bio,
//         location: user.location,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

// POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, skills, bio, location } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
        email,
        passwordHash,
        skills: skills || [],
        bio: bio || "",
        location: location || "",
    });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "7d",
    });
    res.status(201).json({
      message: "User created successfully",
        token,
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        bio: user.bio,
        location: user.location,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        bio: user.bio,
        location: user.location,
      },
    });
    } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
