import express from "express";
import {
  getSkillMatches,
  generateSkillDescription,
  mentorChat,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/matches", protect, getSkillMatches);
router.post("/describe", protect, generateSkillDescription);
router.post("/chat", protect, mentorChat);

export default router;