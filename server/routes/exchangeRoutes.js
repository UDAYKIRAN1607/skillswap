import express from "express";
import {
  sendExchangeRequest,
  getMyExchanges,
  updateExchangeStatus,
  deleteExchange,
} from "../controllers/exchangeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendExchangeRequest);
router.get("/my", protect, getMyExchanges);
router.put("/:id/status", protect, updateExchangeStatus);
router.delete("/:id", protect, deleteExchange);

export default router;