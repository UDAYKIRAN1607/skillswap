// import Skill from "../models/Skill.js";
// import User from "../models/User.js";
// import Groq from "groq-sdk";

// const getGroqClient = () => {
//   return new Groq({ apiKey: process.env.GROQ_API_KEY });
// };

// // POST /api/ai/describe — Generate skill description
// export const generateSkillDescription = async (req, res) => {
//   try {
//     const { title, category, level } = req.body;

//     if (!title || !category) {
//       return res.status(400).json({ success: false, message: "Title and category are required" });
//     }

//     const groq = getGroqClient();

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "user",
//           content: `Write a compelling 2-3 sentence description for a skill listing on a skill exchange platform.
// Skill Title: ${title}
// Category: ${category}
// Level: ${level || "Intermediate"}
// Keep it friendly, specific, and highlight what the learner will gain. Return only the description text, no extra formatting.`,
//         },
//       ],
//       max_tokens: 150,
//     });

//     const description = completion.choices[0]?.message?.content?.trim();
//     res.json({ success: true, description });

//   } catch (error) {
//     console.error("Groq AI error:", error.message);
//     res.status(500).json({ success: false, message: "AI service error: " + error.message });
//   }
// };

// // GET /api/ai/matches — Personalized skill match recommendations
// export const getSkillMatches = async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.user._id);
//     const allSkills = await Skill.find({
//       user: { $ne: req.user._id },
//       isActive: true,
//     }).populate("user", "name email bio location");

//     if (allSkills.length === 0) {
//       return res.json({ success: true, matches: [], message: "No skills available from other users yet." });
//     }

//     const mySkills = await Skill.find({ user: req.user._id, isActive: true });

//     const mySkillsSummary = mySkills.length > 0
//       ? mySkills.map((s) => `${s.title} (${s.type}, ${s.level})`).join(", ")
//       : "No skills listed yet";

//     const skillsList = allSkills.slice(0, 15).map((s) => ({
//       id: s._id.toString(),
//       title: s.title,
//       category: s.category,
//       level: s.level,
//       type: s.type,
//     }));

//     const prompt = `You are a skill-matching assistant for SkillSwap platform.
// User: ${currentUser.name}
// User's skills: ${mySkillsSummary}
// Available skills: ${JSON.stringify(skillsList)}

// Return ONLY a valid JSON array with no extra text, no explanation, no markdown, no code blocks.
// Format exactly like this:
// [{"skillId":"<id>","matchScore":<1-100>,"reason":"<short reason>"}]

// Pick the top 5 most relevant skills. Return ONLY the JSON array.`;

//     const groq = getGroqClient();

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 500,
//       temperature: 0,
//     });

//     let text = completion.choices[0]?.message?.content?.trim();

//     // Robustly extract JSON array from response
//     const jsonStart = text.indexOf("[");
//     const jsonEnd = text.lastIndexOf("]");

//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("No JSON array found in AI response");
//     }

//     const jsonString = text.substring(jsonStart, jsonEnd + 1);
//     const aiMatches = JSON.parse(jsonString);

//     const enriched = aiMatches.map((match) => ({
//       ...match,
//       skill: allSkills.find((s) => s._id.toString() === match.skillId) || null,
//     })).filter((m) => m.skill !== null);

//     res.json({ success: true, matches: enriched });

//   } catch (error) {
//     console.error("Groq AI error:", error.message);
//     res.status(500).json({ success: false, message: "AI service error: " + error.message });
//   }
// };
import Skill from "../models/Skill.js";
import User from "../models/User.js";
import Groq from "groq-sdk";

const getGroqClient = () => {
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

// POST /api/ai/describe — Generate skill description
export const generateSkillDescription = async (req, res) => {
  try {
    const { title, category, level } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, message: "Title and category are required" });
    }

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Write a compelling 2-3 sentence description for a skill listing on a skill exchange platform.
Skill Title: ${title}
Category: ${category}
Level: ${level || "Intermediate"}
Keep it friendly, specific, and highlight what the learner will gain. Return only the description text, no extra formatting.`,
        },
      ],
      max_tokens: 150,
    });

    const description = completion.choices[0]?.message?.content?.trim();
    res.json({ success: true, description });

  } catch (error) {
    console.error("Groq AI error:", error.message);
    res.status(500).json({ success: false, message: "AI service error: " + error.message });
  }
};

// GET /api/ai/matches — Personalized skill match recommendations
export const getSkillMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const allSkills = await Skill.find({
      user: { $ne: req.user._id },
      isActive: true,
    }).populate("user", "name email bio location");

    if (allSkills.length === 0) {
      return res.json({ success: true, matches: [], message: "No skills available from other users yet." });
    }

    const mySkills = await Skill.find({ user: req.user._id, isActive: true });

    const mySkillsSummary = mySkills.length > 0
      ? mySkills.map((s) => `${s.title} (${s.type}, ${s.level})`).join(", ")
      : "No skills listed yet";

    const skillsList = allSkills.slice(0, 15).map((s) => ({
      id: s._id.toString(),
      title: s.title,
      category: s.category,
      level: s.level,
      type: s.type,
    }));

    const prompt = `You are a skill-matching assistant for SkillSwap platform.

User: ${currentUser.name}
User's current skills (what they offer): ${mySkillsSummary}
Available skills from other users: ${JSON.stringify(skillsList)}

Your job: Pick the top 5 most relevant skills for this user and explain WHY each is a good match.

The reason must be 2-3 bullet points starting with "•" on separate lines explaining:
- How the user's skills relate to this match
- Why the skill levels or categories are compatible
- What the user would gain from this exchange

Return ONLY a valid JSON array. No extra text, no markdown, no code blocks.
Format exactly like this:
[{"skillId":"<id>","matchScore":<1-100>,"reason":"• Point one\\n• Point two\\n• Point three"}]

Return ONLY the JSON array.`;

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0,
    });

    let text = completion.choices[0]?.message?.content?.trim();

    // Robustly extract JSON array from response
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON array found in AI response");
    }

    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    const aiMatches = JSON.parse(jsonString);

    const enriched = aiMatches.map((match) => ({
      ...match,
      skill: allSkills.find((s) => s._id.toString() === match.skillId) || null,
    })).filter((m) => m.skill !== null);

    res.json({ success: true, matches: enriched });

  } catch (error) {
    console.error("Groq AI error:", error.message);
    res.status(500).json({ success: false, message: "AI service error: " + error.message });
  }
};

// POST /api/ai/chat — AI Mentor Chat
export const mentorChat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
 
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }
 
    const groq = getGroqClient();
 
    const messages = [
      {
        role: "system",
        content: `You are an AI Mentor on SkillSwap, a skill exchange platform. 
Help users with learning advice, skill roadmaps, and career guidance.
Keep replies concise, practical, and encouraging.
Use bullet points for roadmaps or step-by-step answers.
Never go beyond 150 words in a single reply.`,
      },
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: message },
    ];
 
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });
 
    const reply = completion.choices[0]?.message?.content?.trim();
    res.json({ success: true, reply });
 
  } catch (error) {
    console.error("Groq AI error:", error.message);
    res.status(500).json({ success: false, message: "AI service error: " + error.message });
  }
};

// POST /api/ai/demo-match — Public demo match (no auth required)
export const demoMatch = async (req, res) => {
  try {
    const { skill, wantToLearn } = req.body;
 
    if (!skill || !wantToLearn) {
      return res.status(400).json({ success: false, message: "skill and wantToLearn are required" });
    }
 
    const groq = getGroqClient();
 
    const prompt = `You are a skill-matching AI on SkillSwap platform.
 
A user offers: ${skill}
A user wants to learn: ${wantToLearn}
 
Generate a skill match result with:
1. A match score between 60-99
2. Exactly 3 bullet points explaining why this is a good skill match
 
Return ONLY valid JSON. No extra text, no markdown, no code blocks.
Format exactly like this:
{"matchScore": <number>, "reasons": ["reason 1", "reason 2", "reason 3"]}`;
 
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });
 
    let text = completion.choices[0]?.message?.content?.trim();
 
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON found in AI response");
    }
 
    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
    res.json({ success: true, matchScore: parsed.matchScore, reasons: parsed.reasons });
 
  } catch (error) {
    console.error("Groq AI error:", error.message);
    res.status(500).json({ success: false, message: "AI service error: " + error.message });
  }
};