import { GoogleGenerativeAI } from "@google/generative-ai";
import Skill from "../models/Skill.js";
import User from "../models/User.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GET /api/ai/matches — personalized skill match recommendations
export const getSkillMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    // Get all skills NOT belonging to current user
    const allSkills = await Skill.find({
      user: { $ne: req.user._id },
      isActive: true,
    }).populate("user", "name email bio location");

    if (allSkills.length === 0) {
      return res.json({
        success: true,
        matches: [],
        message: "No skills available from other users yet.",
      });
    }

    // Get current user's own skills
    const mySkills = await Skill.find({ user: req.user._id, isActive: true });

    const mySkillsSummary =
      mySkills.length > 0
        ? mySkills.map((s) => `${s.title} (${s.type}, ${s.level})`).join(", ")
        : "No skills listed yet";

    const userProfile = `
      Name: ${currentUser.name}
      Bio: ${currentUser.bio || "Not provided"}
      Skills: ${currentUser.skills?.join(", ") || "None"}
      My Listed Skills: ${mySkillsSummary}
    `;

    // Build skills list for Gemini
    const skillsList = allSkills.map((s, i) => ({
      index: i,
      id: s._id.toString(),
      title: s.title,
      description: s.description,
      category: s.category,
      level: s.level,
      type: s.type,
      tags: s.tags,
      userName: s.user.name,
      userBio: s.user.bio || "",
    }));

    const prompt = `
You are an intelligent skill-matching assistant for a skill exchange platform called SkillSwap.

A user wants personalized skill recommendations. Analyze their profile and match them with the most relevant skills from others.

USER PROFILE:
${userProfile}

AVAILABLE SKILLS FROM OTHER USERS (JSON):
${JSON.stringify(skillsList, null, 2)}

Your task:
1. Select the TOP 6 most relevant skills for this user based on their profile, interests, and what they can offer in return.
2. For each match, provide a brief personalized reason why it's a good fit.
3. Give a match score from 1-100.

Respond ONLY with a valid JSON array (no markdown, no explanation outside JSON):
[
  {
    "skillId": "<skill id>",
    "matchScore": <number 1-100>,
    "reason": "<1-2 sentence personalized reason>"
  }
]
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse Gemini response
    let aiMatches = [];
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      aiMatches = JSON.parse(cleaned);
    } catch (parseErr) {
      return res.status(500).json({
        success: false,
        message: "AI response could not be parsed. Please try again.",
      });
    }

    // Enrich with full skill data
    const enriched = aiMatches.map((match) => {
      const skill = allSkills.find((s) => s._id.toString() === match.skillId);
      return {
        ...match,
        skill: skill || null,
      };
    }).filter((m) => m.skill !== null);

    res.json({ success: true, matches: enriched });
  } catch (error) {
    console.error("Gemini AI error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/describe — AI-generated skill description helper
export const generateSkillDescription = async (req, res) => {
  try {
    const { title, category, level } = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Title and category are required" });
    }

    const prompt = `
Write a compelling 2-3 sentence description for a skill listing on a skill exchange platform.

Skill Title: ${title}
Category: ${category}
Level: ${level || "Intermediate"}

Keep it friendly, specific, and highlight what the learner will gain. Do not use bullet points. Return only the description text, nothing else.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const description = result.response.text().trim();

    res.json({ success: true, description });
  } catch (error) {
    console.error("Gemini AI error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};