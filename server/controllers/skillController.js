import Skill from "../models/Skill.js";

// Create a new skill
export const createSkill = async (req, res) => {
  try {
    const { title, description, category, level, type, tags } = req.body;

    const skill = await Skill.create({
      user: req.user._id,
      title,
      description,
      category,
      level,
      type,
      tags,
    });

    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all skills (with optional filters)
export const getAllSkills = async (req, res) => {
  try {
    const { category, type, level, search } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skills = await Skill.find(filter)
      .populate("user", "name email bio location")
      .sort({ createdAt: -1 });

    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get skills by logged-in user
export const getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single skill
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate(
      "user",
      "name email bio location"
    );
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    res.json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update skill
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    if (skill.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, skill: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete skill
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    if (skill.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};