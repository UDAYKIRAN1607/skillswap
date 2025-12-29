import express from "express";
import { getMe, updateSkills } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/me", authMiddleware, getMe);
router.put("/skills", authMiddleware, updateSkills);
export default router;
