import Exchange from "../models/Exchange.js";

// Send exchange request
export const sendExchangeRequest = async (req, res) => {
  try {
    const { receiverId, senderSkillId, receiverSkillId, message } = req.body;

    // Prevent self-exchange
    if (receiverId === req.user._id.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot exchange with yourself" });
    }

    // Check for existing pending request
    const existing = await Exchange.findOne({
      sender: req.user._id,
      receiver: receiverId,
      senderSkill: senderSkillId,
      receiverSkill: receiverSkillId,
      status: "pending",
    });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Exchange request already sent" });
    }

    const exchange = await Exchange.create({
      sender: req.user._id,
      receiver: receiverId,
      senderSkill: senderSkillId,
      receiverSkill: receiverSkillId,
      message,
    });

    const populated = await Exchange.findById(exchange._id)
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .populate("senderSkill", "title category")
      .populate("receiverSkill", "title category");

    res.status(201).json({ success: true, exchange: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get my exchanges (sent + received)
export const getMyExchanges = async (req, res) => {
  try {
    const sent = await Exchange.find({ sender: req.user._id })
      .populate("receiver", "name email")
      .populate("senderSkill", "title category level")
      .populate("receiverSkill", "title category level")
      .sort({ createdAt: -1 });

    const received = await Exchange.find({ receiver: req.user._id })
      .populate("sender", "name email")
      .populate("senderSkill", "title category level")
      .populate("receiverSkill", "title category level")
      .sort({ createdAt: -1 });

    res.json({ success: true, sent, received });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update exchange status (accept / reject / complete)
export const updateExchangeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const exchange = await Exchange.findById(req.params.id);

    if (!exchange) {
      return res
        .status(404)
        .json({ success: false, message: "Exchange not found" });
    }

    // Only receiver can accept/reject; either party can mark complete
    if (
      status === "accepted" || status === "rejected"
        ? exchange.receiver.toString() !== req.user._id.toString()
        : exchange.sender.toString() !== req.user._id.toString() &&
          exchange.receiver.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    exchange.status = status;
    await exchange.save();

    res.json({ success: true, exchange });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete exchange request (only sender, only if pending)
export const deleteExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id);
    if (!exchange) {
      return res
        .status(404)
        .json({ success: false, message: "Exchange not found" });
    }
    if (exchange.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    if (exchange.status !== "pending") {
      return res
        .status(400)
        .json({ success: false, message: "Can only delete pending requests" });
    }

    await Exchange.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Exchange request deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};