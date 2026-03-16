import express from "express";
import {
  getSkillMatches,
  generateSkillDescription,
  mentorChat,
  demoMatch,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/matches", protect, getSkillMatches);
router.post("/describe", protect, generateSkillDescription);
router.post("/chat", protect, mentorChat);
router.post("/demo-match", demoMatch);

export default router;