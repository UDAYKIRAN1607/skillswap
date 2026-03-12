// // src/pages/AIMatches.tsx
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import api from "../api";

// type Match = {
//   skillId: string;
//   matchScore: number;
//   reason: string;
//   skill: {
//     _id: string;
//     title: string;
//     description: string;
//     category: string;
//     level: string;
//     type: string;
//     tags?: string[];
//     user?: { name: string; email: string };
//   };
// };

// const AIMatches: React.FC = () => {
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetched, setFetched] = useState(false);
//   const [error, setError] = useState("");

//   const fetchMatches = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await api.get("/ai/matches");
//       setMatches(res.data.matches);
//       setFetched(true);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Failed to fetch matches. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getScoreColor = (score: number) => {
//     if (score >= 80) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
//     if (score >= 60) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
//     return "text-red-400 bg-red-400/10 border-red-400/20";
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50">
//       <Navbar />
//       <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

//         {/* Hero */}
//         <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 p-8 text-center space-y-4">
//           <div className="text-4xl">✦</div>
//           <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400">
//             AI Skill Matching
//           </h1>
//           <p className="text-slate-400 text-sm max-w-md mx-auto">
//             Powered by Google Gemini — get personalized skill recommendations based on your profile and interests
//           </p>
//           <button
//             onClick={fetchMatches}
//             disabled={loading}
//             className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
//               loading
//                 ? "bg-indigo-600/40 text-indigo-300 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center gap-2 justify-center">
//                 <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                 </svg>
//                 Analyzing with Gemini AI...
//               </span>
//             ) : fetched ? "✦ Refresh Matches" : "✦ Find My Matches"}
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm">
//             {error}
//           </div>
//         )}

//         {/* Results */}
//         {fetched && !loading && (
//           <>
//             <h2 className="text-xl font-bold text-slate-100">
//               {matches.length > 0
//                 ? `✦ ${matches.length} Personalized Matches Found`
//                 : "No matches found — add more skills to your profile!"}
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {matches.map((match, i) => (
//                 <div
//                   key={match.skillId}
//                   className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4 hover:border-indigo-500/30 transition-all"
//                 >
//                   {/* Rank + Score */}
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
//                       Match #{i + 1}
//                     </span>
//                     <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(match.matchScore)}`}>
//                       {match.matchScore}% Match
//                     </span>
//                   </div>

//                   {/* Skill info */}
//                   <div>
//                     <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
//                       {match.skill.category}
//                     </p>
//                     <h3 className="text-base font-bold text-slate-100">{match.skill.title}</h3>
//                     <p className="text-sm text-slate-400 mt-1 line-clamp-2">{match.skill.description}</p>
//                   </div>

//                   {/* AI Reason */}
//                   <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3">
//                     <p className="text-xs text-indigo-400 font-semibold mb-1">✦ WHY THIS MATCHES YOU</p>
//                     <p className="text-sm text-slate-300 leading-relaxed">{match.reason}</p>
//                   </div>

//                   {/* Footer */}
//                   <div className="flex items-center justify-between pt-1 border-t border-slate-800">
//                     {match.skill.user && (
//                       <div className="flex items-center gap-1.5">
//                         <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
//                           {match.skill.user.name.charAt(0).toUpperCase()}
//                         </div>
//                         <span className="text-xs text-slate-500">{match.skill.user.name}</span>
//                       </div>
//                     )}
//                     <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
//                       {match.skill.level}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AIMatches;
// src/pages/AIMatches.tsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";

type Match = {
  skillId: string;
  matchScore: number;
  reason: string;
  skill: {
    _id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    type: string;
    tags?: string[];
    user?: { name: string; email: string };
  };
};

const AIMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/ai/matches");
      setMatches(res.data.matches);
      setFetched(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch matches. Please try again.");
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
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Hero */}
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 p-8 text-center space-y-4">
          <div className="text-4xl">✦</div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400">
            AI Skill Matching
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Powered by Groq AI — get personalized skill recommendations based on your profile and interests
          </p>
          <button
            onClick={fetchMatches}
            disabled={loading}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
              loading
                ? "bg-indigo-600/40 text-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Analyzing with Groq AI...
              </span>
            ) : fetched ? "✦ Refresh Matches" : "✦ Find My Matches"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {fetched && !loading && (
          <>
            <h2 className="text-xl font-bold text-slate-100">
              {matches.length > 0
                ? `✦ ${matches.length} Personalized Matches Found`
                : "No matches found — add more skills to your profile!"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {matches.map((match, i) => (
                <div
                  key={match.skillId}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4 hover:border-indigo-500/30 transition-all"
                >
                  {/* Rank + Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Match #{i + 1}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(match.matchScore)}`}>
                      {match.matchScore}% Match
                    </span>
                  </div>

                  {/* Skill info */}
                  <div>
                    <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
                      {match.skill.category}
                    </p>
                    <h3 className="text-base font-bold text-slate-100">{match.skill.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{match.skill.description}</p>
                  </div>

                  {/* AI Reason */}
                  <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3">
                    <p className="text-xs text-indigo-400 font-semibold mb-1">✦ WHY THIS MATCHES YOU</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{match.reason}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    {match.skill.user && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                          {match.skill.user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs text-slate-500">{match.skill.user.name}</span>
                      </div>
                    )}
                    <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      {match.skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIMatches;