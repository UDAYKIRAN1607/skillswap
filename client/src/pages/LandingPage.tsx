// src/pages/LandingPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SKILLS = ["React", "JavaScript", "Python", "Node.js", "MongoDB", "TypeScript", "UI/UX Design", "Java", "Machine Learning", "Docker"];

const TryAIMatch: React.FC = () => {
    const [skill, setSkill] = useState("React");
    const [wantToLearn, setWantToLearn] = useState("Python");
    const [result, setResult] = useState<{ matchScore: number; reasons: string[] } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/ai/demo-match`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill, wantToLearn }),
            });
            const data = await res.json();
            if (data.success) {
                setResult({ matchScore: data.matchScore, reasons: data.reasons });
            } else {
                setError("Failed to generate match. Try again!");
            }
        } catch {
            setError("Failed to connect. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        if (score >= 60) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
        return "text-red-400 bg-red-400/10 border-red-400/20";
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">⚡ Try AI Match Yourself</h2>
                <p className="text-slate-400 text-sm">Select your skill and what you want to learn — AI generates a real match explanation</p>
            </div>

            <div className="max-w-xl mx-auto rounded-2xl border border-indigo-500/20 bg-slate-900 p-6 space-y-5">
                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Your Skill</label>
                        <select
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            className="w-full bg-slate-800 text-slate-100 text-sm rounded-xl px-3 py-2.5 border border-slate-700 focus:border-indigo-500 outline-none transition-all"
                        >
                            {SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Want to Learn</label>
                        <select
                            value={wantToLearn}
                            onChange={(e) => setWantToLearn(e.target.value)}
                            className="w-full bg-slate-800 text-slate-100 text-sm rounded-xl px-3 py-2.5 border border-slate-700 focus:border-indigo-500 outline-none transition-all"
                        >
                            {SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handleGenerate}
                    disabled={loading || skill === wantToLearn}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Generating with Groq AI...
                        </>
                    ) : "✦ Generate AI Match"}
                </button>

                {skill === wantToLearn && (
                    <p className="text-xs text-yellow-400 text-center">Please select two different skills!</p>
                )}

                {/* Error */}
                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Result */}
                {result && (
                    <div className="space-y-3 pt-2 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Match Result</span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(result.matchScore)}`}>
                                {result.matchScore}% Match
                            </span>
                        </div>
                        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2">
                            <p className="text-xs text-indigo-400 font-semibold">✦ WHY THIS MATCHES</p>
                            <ul className="space-y-1.5">
                                {result.reasons.map((reason, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-1.5">
                                        <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                                        <span>{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-xs text-slate-500 text-center">Powered by Groq AI (LLaMA 3.3) · Real AI response</p>
                    </div>
                )}
            </div>
        </section>
    );
};

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800 max-w-6xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">SS</div>
                    <span className="font-bold text-lg text-slate-100">SkillSwap</span>
                    <span className="text-xs text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded-full ml-1">Full-stack + GenAI</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-slate-300 hover:text-white transition-all px-4 py-2 rounded-lg hover:bg-slate-800"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-indigo-600/20"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 text-center space-y-6">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                    ✦ AI Powered Skill Exchange Platform
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400 leading-tight">
                    Learn Skills.<br />Teach Skills.<br />Grow Together.
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                    Connect with people to learn and teach skills using AI-powered matching, mentor chatbot, and personalized recommendations.
                </p>
                <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                    >
                        Join SkillSwap →
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-8 py-3 rounded-xl transition-all"
                    >
                        Login
                    </button>
                </div>
            </section>

            {/* AI Features Badge */}
            <section className="max-w-6xl mx-auto px-6 pb-4">
                <div className="flex flex-wrap justify-center gap-3">
                    {["✔ AI Skill Recommendation", "✔ AI Mentor Chatbot", "✔ AI Match Ranking with Score"].map((badge) => (
                        <span key={badge} className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full font-semibold">
                            {badge}
                        </span>
                    ))}
                </div>
            </section>

            {/* AI Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-16 space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">🚀 AI Features</h2>
                    <p className="text-slate-400 text-sm">Not just a CRUD app — powered by Groq AI (LLaMA 3.3)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Card 1 */}
                    <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 to-indigo-950/30 p-6 space-y-3 hover:border-indigo-500/40 transition-all">
                        <div className="text-3xl">🤖</div>
                        <h3 className="font-bold text-slate-100 text-lg">AI Skill Recommendation</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Suggests relevant skills users can learn or offer based on their profile and current skill set.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {["Personalized", "LLaMA 3.3", "Real-time"].map((tag) => (
                                <span key={tag} className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-slate-900 to-violet-950/30 p-6 space-y-3 hover:border-violet-500/40 transition-all">
                        <div className="text-3xl">💬</div>
                        <h3 className="font-bold text-slate-100 text-lg">AI Mentor Chatbot</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            An AI assistant that guides users about skills, learning paths, roadmaps, and career mentoring.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {["Conversational AI", "Groq AI", "24/7"].map((tag) => (
                                <span key={tag} className="text-xs text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-slate-900 to-sky-950/30 p-6 space-y-3 hover:border-sky-500/40 transition-all">
                        <div className="text-3xl">📊</div>
                        <h3 className="font-bold text-slate-100 text-lg">AI Match Ranking</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Automatically matches learners and mentors using AI with a match score and explanation of why skills align.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {["Explainable AI", "Match Score", "Smart"].map((tag) => (
                                <span key={tag} className="text-xs text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sample AI Match Card */}
            <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">🧠 AI Skill Match Example</h2>
                    <p className="text-slate-400 text-sm">See how our AI explains skill matches in real time</p>
                </div>

                <div className="max-w-xl mx-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Match #1</span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/20">
                            92% Match
                        </span>
                    </div>
                    <div>
                        <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">Technology</p>
                        <h3 className="text-base font-bold text-slate-100">Python Development</h3>
                        <p className="text-sm text-slate-400 mt-1">Learn Python including data structures, algorithms, and backend development with Django and Flask.</p>
                    </div>
                    <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2">
                        <p className="text-xs text-indigo-400 font-semibold">✦ WHY THIS MATCHES YOU</p>
                        <ul className="space-y-1.5">
                            {[
                                "You offer React which complements Python backend skills",
                                "Both users are at intermediate level making exchange effective",
                                "Learning Python expands your full stack capabilities",
                            ].map((point, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-start gap-1.5">
                                    <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">A</div>
                            <span className="text-xs text-slate-500">Alice Johnson</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">Intermediate</span>
                    </div>
                </div>
            </section>

            {/* Interactive AI Demo Section */}
            <TryAIMatch />

            {/* Example Users Section */}
            <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">👥 Active Skill Exchanges</h2>
                    <p className="text-slate-400 text-sm">See what people are offering and learning on SkillSwap</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {[
                        { name: "Rahul", avatar: "R", offers: ["JavaScript", "React"], wants: "Node.js", color: "from-indigo-500 to-sky-500" },
                        { name: "Priya", avatar: "P", offers: ["UI/UX Design", "Figma"], wants: "React", color: "from-violet-500 to-indigo-500" },
                        { name: "Arjun", avatar: "A", offers: ["Python", "Django"], wants: "TypeScript", color: "from-emerald-500 to-sky-500" },
                        { name: "Sara", avatar: "S", offers: ["Machine Learning"], wants: "React", color: "from-pink-500 to-violet-500" },
                        { name: "Vikram", avatar: "V", offers: ["Node.js", "MongoDB"], wants: "UI/UX Design", color: "from-orange-500 to-pink-500" },
                        { name: "Neha", avatar: "N", offers: ["Java", "Spring Boot"], wants: "Python", color: "from-sky-500 to-indigo-500" },
                    ].map((user) => (
                        <div key={user.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4 hover:border-indigo-500/30 transition-all">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                                    {user.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-100 text-sm">{user.name}</p>
                                    <p className="text-xs text-slate-500">SkillSwap Member</p>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">✦ Offers</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {user.offers.map((skill) => (
                                        <span key={skill} className="text-xs text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">🎯 Wants to Learn</p>
                                <span className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full inline-block">
                                    {user.wants}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="max-w-6xl mx-auto px-6 py-16 space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">⚡ How SkillSwap Works</h2>
                    <p className="text-slate-400 text-sm">Get started in 4 simple steps</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {[
                        { step: "01", icon: "👤", title: "Create Profile", desc: "Sign up and set up your profile with your skills and interests" },
                        { step: "02", icon: "🎯", title: "Add Skills", desc: "List skills you can teach and skills you want to learn" },
                        { step: "03", icon: "✦", title: "AI Matching", desc: "Get AI-powered mentor and skill matches with match scores" },
                        { step: "04", icon: "🚀", title: "Start Learning", desc: "Exchange skills, chat with AI mentor, and grow together" },
                    ].map((item) => (
                        <div key={item.step} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3 hover:border-indigo-500/30 transition-all">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-xs font-bold text-slate-600">{item.step}</span>
                            </div>
                            <h3 className="font-bold text-slate-100">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Stack */}
            <section className="max-w-6xl mx-auto px-6 py-8">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center space-y-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Built With</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["React", "TypeScript", "Node.js", "Express", "MongoDB", "Groq AI", "LLaMA 3.3", "JWT", "Vercel", "Render"].map((tech) => (
                            <span key={tech} className="text-xs text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400">
                    Start Learning and Sharing Skills
                </h2>
                <p className="text-slate-400 max-w-md mx-auto">
                    Join SkillSwap and get AI-powered skill recommendations, mentor matches, and career guidance.
                </p>
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                >
                    Join SkillSwap for Free →
                </button>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-xs">
                <p>Built by <span className="text-indigo-400 font-semibold">M S Uday Kiran</span> · Full Stack + GenAI Developer</p>
                <p className="mt-1">React · TypeScript · Node.js · MongoDB · Groq AI</p>
            </footer>

        </div>
    );
};

export default LandingPage;