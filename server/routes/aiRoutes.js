import express from "express";
import {
  getSkillMatches,
  generateSkillDescription,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/matches", protect, getSkillMatches);
router.post("/describe", protect, generateSkillDescription);

export default router;