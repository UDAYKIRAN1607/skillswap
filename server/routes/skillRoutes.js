import express from "express";
import {
  createSkill,
  getAllSkills,
  getMySkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillcontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllSkills);
router.get("/my", protect, getMySkills);
router.get("/:id", protect, getSkillById);
router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;