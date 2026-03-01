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
// import React, { useEffect, useState } from "react";
// import type { User } from "./types";
// import { apiRequest } from "./api";
// import { useNavigate } from "react-router-dom";
// import { AVAILABLE_SKILLS } from "./constants/skills";

// const Dashboard: React.FC = () => {
//     const [user, setUser] = useState<User | null>(null);
//     const navigate = useNavigate();
//     const [editing, setEditing] = useState(false);
//     const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//     const [saving, setSaving] = useState(false);
//     // useEffect(() => {
//     //     const stored = localStorage.getItem("user");
//     //     if (!stored) {
//     //         navigate("/login");
//     //         return;
//     //     }
//     //     setUser(JSON.parse(stored));
//     // }, [navigate]);
//     useEffect(() => {
//         if (user?.skills) {
//             setSelectedSkills(user.skills);
//         }
//     }, [user]);
//     const toggleSkill = (skill: string) => {
//         setSelectedSkills((prev) =>
//             prev.includes(skill)
//                 ? prev.filter((s) => s !== skill)
//                 : [...prev, skill]
//         );
//     };
//     const saveSkills = async () => {
//         try {
//             setSaving(true);

//             const updatedUser = await apiRequest<User>(
//                 "/users/skills",
//                 "PUT",
//                 { skills: selectedSkills }
//             );

//             setUser(updatedUser);
//             setEditing(false);
//         } catch (error) {
//             console.error("Failed to update skills", error);
//         } finally {
//             setSaving(false);
//         }
//     };

//     useEffect(() => {
//         async function verifyUser() {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 navigate("/login");
//                 return;
//             }
//             try {
//                 const me = await apiRequest<User>("/users/me", "GET");
//                 setUser(me);
//             } catch (error) {
//                 console.error("User verification failed", error);
//                 localStorage.clear();
//                 navigate("/login");
//             }
//         }

//         verifyUser();
//     }, [navigate]);


//     function handleLogout() {
//         localStorage.clear();
//         navigate("/login");
//     }
//     return (
//         <div className="min-h-screen bg-slate-950 text-slate-50">
//             <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">

//                 {/* Top bar */}
//                 <header className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur px-4 py-3 flex items-center justify-between shadow-lg shadow-slate-900/50">
//                     <div className="flex items-center gap-3">
//                         <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold">
//                             SS
//                         </div>
//                         <div>
//                             <p className="text-sm font-semibold">SkillSwap</p>
//                             <p className="text-[11px] text-slate-400">Full-stack + GenAI</p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <span className="hidden text-xs text-slate-300 sm:inline">
//                             {user?.email}
//                         </span>
//                         <button
//                             onClick={handleLogout}
//                             className="rounded-full bg-slate-800 px-4 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-700 border border-slate-600 transition-shadow shadow-md hover:shadow-slate-800"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </header>

//                 {/* Main content */}
//                 <main className="space-y-4">

//                     {/* Hero */}
//                     <section>
//                         <h1 className="text-3xl font-semibold mb-2 flex items-center gap-2">
//                             Hi, {user?.name ?? "Skill Swapper"} <span>👋</span>
//                         </h1>
//                         <p className="text-sm text-slate-400">
//                             Welcome back! Manage your skills, explore matches, and track your growth.
//                         </p>
//                     </section>

//                     {/* Cards grid */}
//                     <section className="grid gap-6 lg:grid-cols-3">
//                         <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-lg shadow-slate-900/50">

//                             <div className="flex items-center justify-between mb-4">
//                                 <h2 className="text-sm font-semibold text-slate-300 tracking-wide">
//                                     Your Skills
//                                 </h2>
//                                 <button
//                                     onClick={() => setEditing(!editing)}
//                                     className="text-xs text-sky-400 hover:underline"
//                                 >
//                                     {editing ? "Cancel" : "Edit"}
//                                 </button>
//                             </div>

//                             {/* VIEW MODE */}
//                             {!editing && (
//                                 <div className="flex flex-wrap gap-2">
//                                     {user?.skills && user.skills.length > 0 ? (
//                                         user.skills.map((skill) => (
//                                             <span
//                                                 key={skill}
//                                                 className="inline-flex items-center rounded-full border border-sky-600/50 bg-sky-600/15 px-3 py-1 text-xs text-sky-200 font-medium"
//                                             >
//                                                 {skill}
//                                             </span>
//                                         ))
//                                     ) : (
//                                         <p className="text-xs text-slate-500">
//                                             No skills added yet. Click <span className="text-sky-400">Edit</span> to add skills.
//                                         </p>
//                                     )}
//                                 </div>
//                             )}

//                             {/* EDIT MODE */}
//                             {editing && (
//                                 <>
//                                     <div className="flex flex-wrap gap-2 mb-4">
//                                         {AVAILABLE_SKILLS.map((skill) => (
//                                             <button
//                                                 key={skill}
//                                                 onClick={() => toggleSkill(skill)}
//                                                 className={`px-3 py-1 rounded-full border text-xs font-medium transition
//                         ${selectedSkills.includes(skill)
//                                                         ? "bg-sky-600 text-white border-sky-600"
//                                                         : "border-slate-600 text-slate-300 hover:bg-slate-800"
//                                                     }`}
//                                             >
//                                                 {skill}
//                                             </button>
//                                         ))}
//                                     </div>

//                                     <button
//                                         onClick={saveSkills}
//                                         disabled={saving}
//                                         className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
//                                     >
//                                         {saving ? "Saving..." : "Save Skills"}
//                                     </button>
//                                 </>
//                             )}
//                         </div>
                        
//                         {/* Next steps card */}
//                         <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-lg shadow-slate-900/50">
//                             <h2 className="text-sm font-semibold mb-4 text-slate-300 tracking-wide">
//                                 Next Steps
//                             </h2>
//                             <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
//                                 <li>• Add skill selection UI</li>
//                                 <li>• Implement matching algorithm</li>
//                                 <li>• Integrate GenAI for suggestions</li>
//                             </ul>
//                         </div>
//                     </section>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import type { User } from "./types";
import { apiRequest } from "./api";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { AVAILABLE_SKILLS } from "./constants/skills";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    totalSkills: 0,
    pendingExchanges: 0,
    acceptedExchanges: 0,
  });

  useEffect(() => {
    if (user?.skills) {
      setSelectedSkills(user.skills);
    }
  }, [user]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const saveSkills = async () => {
    try {
      setSaving(true);
      const updatedUser = await apiRequest<User>("/users/skills", "PUT", {
        skills: selectedSkills,
      });
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update skills", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    async function verifyUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const me = await apiRequest<User>("/users/me", "GET");
        setUser(me);

        // Fetch stats
        const [skillsRes, exchangesRes] = await Promise.all([
          api.get("/skills/my"),
          api.get("/exchanges/my"),
        ]);
        const pending = [
          ...exchangesRes.data.received.filter((e: any) => e.status === "pending"),
        ].length;
        const accepted = [
          ...exchangesRes.data.sent.filter((e: any) => e.status === "accepted"),
          ...exchangesRes.data.received.filter((e: any) => e.status === "accepted"),
        ].length;
        setStats({
          totalSkills: skillsRes.data.skills.length,
          pendingExchanges: pending,
          acceptedExchanges: accepted,
        });
      } catch (error) {
        console.error("User verification failed", error);
        localStorage.clear();
        navigate("/login");
      }
    }
    verifyUser();
  }, [navigate]);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const quickLinks = [
    {
      path: "/skills",
      label: "Browse Skills",
      icon: "🔍",
      desc: "Discover and add skills",
      color: "from-sky-500/20 to-sky-600/10 border-sky-500/30 hover:border-sky-400/50",
    },
    {
      path: "/exchanges",
      label: "My Exchanges",
      icon: "🔄",
      desc: "Manage exchange requests",
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 hover:border-emerald-400/50",
      badge: stats.pendingExchanges > 0 ? stats.pendingExchanges : null,
    },
    {
      path: "/ai-matches",
      label: "AI Matches",
      icon: "✦",
      desc: "Get personalized recommendations",
      color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 hover:border-indigo-400/50",
    },
    {
      path: "/profile",
      label: "My Profile",
      icon: "👤",
      desc: "Edit your profile & skills",
      color: "from-violet-500/20 to-violet-600/10 border-violet-500/30 hover:border-violet-400/50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">

        {/* Top bar */}
        <header className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur px-4 py-3 flex items-center justify-between shadow-lg">
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
            <span className="hidden text-xs text-slate-300 sm:inline">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-800 px-4 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-700 border border-slate-600 transition-all"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Hero */}
        <section>
          <h1 className="text-3xl font-semibold mb-1 flex items-center gap-2">
            Hi, {user?.name ?? "Skill Swapper"} <span>👋</span>
          </h1>
          <p className="text-sm text-slate-400">
            Welcome back! Manage your skills, explore matches, and track your growth.
          </p>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
            <p className="text-3xl font-extrabold text-sky-400">{stats.totalSkills}</p>
            <p className="text-xs text-slate-400 mt-1">Skills Listed</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
            <p className="text-3xl font-extrabold text-yellow-400">{stats.pendingExchanges}</p>
            <p className="text-xs text-slate-400 mt-1">Pending Requests</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
            <p className="text-3xl font-extrabold text-emerald-400">{stats.acceptedExchanges}</p>
            <p className="text-xs text-slate-400 mt-1">Active Exchanges</p>
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-2xl border bg-gradient-to-br ${link.color} p-4 flex flex-col gap-2 transition-all hover:scale-[1.02] relative`}
              >
                {link.badge && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
                <span className="text-2xl">{link.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-100">{link.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills Card */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300 tracking-wide">Your Skills</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="text-xs text-sky-400 hover:underline"
              >
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>

            {!editing && (
              <div className="flex flex-wrap gap-2">
                {user?.skills && user.skills.length > 0 ? (
                  user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-sky-600/50 bg-sky-600/15 px-3 py-1 text-xs text-sky-200 font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">
                    No skills added yet. Click <span className="text-sky-400">Edit</span> to add skills.
                  </p>
                )}
              </div>
            )}

            {editing && (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {AVAILABLE_SKILLS.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full border text-xs font-medium transition ${
                        selectedSkills.includes(skill)
                          ? "bg-sky-600 text-white border-sky-600"
                          : "border-slate-600 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <button
                  onClick={saveSkills}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Skills"}
                </button>
              </>
            )}
          </div>

          {/* Platform Features Card */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-lg">
            <h2 className="text-sm font-semibold mb-4 text-slate-300 tracking-wide">
              Platform Features
            </h2>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> JWT Authentication
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Skill Listing & Discovery
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Exchange Request System
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> AI-Powered Skill Matching
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> MongoDB Atlas Integration
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;