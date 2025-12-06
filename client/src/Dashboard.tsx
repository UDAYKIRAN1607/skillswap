// import React, { useEffect, useState } from "react";
// import type { User } from "./types"
// import { useNavigate } from "react-router-dom";

// const Dashboard: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (!stored) {
//       navigate("/login");
//       return;
//     }
//     setUser(JSON.parse(stored));
//   }, [navigate]);

//   function handleLogout() {
//     localStorage.clear();
//     navigate("/login");
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50">
//       <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
//         <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold">
//               SS
//             </div>
//             <div>
//               <p className="text-sm font-semibold">SkillSwap</p>
//               <p className="text-[11px] text-slate-400">Full-stack + GenAI</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-xs text-slate-400 hidden sm:inline">
//               {user?.email}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       <main className="mx-auto max-w-5xl px-4 py-8">
//         <h1 className="text-2xl font-semibold mb-2">
//           Hi, {user?.name ?? "Skill Swapper"} 👋
//         </h1>
//         <p className="text-sm text-slate-400 mb-6">
//           This is your early dashboard preview. Soon we’ll show matches,
//           skill offers, and AI recommendations here.
//         </p>

//         <div className="grid gap-4 md:grid-cols-3">
//           <section className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
//             <h2 className="text-sm font-semibold mb-2">Your Skills</h2>
//             {user?.skills && user.skills.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {user.skills.map((s: string, i: number) => (
//                   <span
//                     key={i}
//                     className="inline-flex items-center rounded-full border border-sky-600/50 bg-sky-500/10 px-3 py-1 text-xs text-sky-100"
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-xs text-slate-500">
//                 No skills added yet. Later we’ll build a profile editor here.
//               </p>
//             )}
//           </section>

//           <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
//             <h2 className="text-sm font-semibold mb-2">Next Steps</h2>
//             <ul className="space-y-2 text-xs text-slate-400">
//               <li>• Add skill selection UI</li>
//               <li>• Implement matching algorithm</li>
//               <li>• Integrate GenAI for suggestions</li>
//             </ul>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import type { User } from "./types";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) {
            navigate("/login");
            return;
        }
        setUser(JSON.parse(stored));
    }, [navigate]);

    function handleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
                {/* Top bar */}
                <header className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur px-4 py-3 flex items-center justify-between shadow-lg shadow-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold">
                            SS
                        </div>
                        <div>
                            <p className="text-sm font-semibold">SkillSwap</p>
                            <p className="text-[11px] text-slate-400">Full-stack + GenAI</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden text-xs text-slate-300 sm:inline">
                            {user?.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="rounded-full bg-slate-800 px-4 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-700 border border-slate-600 transition-shadow shadow-md hover:shadow-slate-800"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main content */}
                <main className="space-y-4">
                    {/* Hero text */}
                    <section>
                        <h1 className="text-3xl font-semibold mb-2 flex items-center gap-2">
                            Hi, {user?.name ?? "Skill Swapper"} <span>👋</span>
                        </h1>
                        <p className="text-sm text-slate-400">
                            Welcome back! Manage your skills, explore matches, and track your growth.
                        </p>
                    </section>

                    {/* Cards grid */}
                    <section className="grid gap-6 lg:grid-cols-3">
                        {/* Skills card */}
                        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-lg shadow-slate-900/50">
                            <h2 className="text-sm font-semibold mb-4 text-slate-300 tracking-wide">
                                Your Skills
                            </h2>

                            {user?.skills && user.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((s, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center rounded-full border border-sky-600/50 bg-sky-600/15 px-3 py-1 text-xs text-sky-200 font-medium"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500">
                                    No skills added yet. Later we’ll build a profile editor here.
                                </p>
                            )}
                        </div>

                        {/* Next steps card */}
                        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-lg shadow-slate-900/50">
                            <h2 className="text-sm font-semibold mb-4 text-slate-300 tracking-wide">
                                Next Steps
                            </h2>
                            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                                <li>• Add skill selection UI</li>
                                <li>• Implement matching algorithm</li>
                                <li>• Integrate GenAI for suggestions</li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );

};

export default Dashboard;
