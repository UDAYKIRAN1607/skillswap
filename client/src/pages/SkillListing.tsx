// // src/pages/SkillListing.tsx
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import SkillCard from "../components/SkillCard";
// import api from "../api";

// const CATEGORIES = ["All","Technology","Design","Music","Language","Cooking","Fitness","Business","Art","Education","Other"];
// const TYPES = ["All", "offer", "request"];
// const LEVELS = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

// const SkillListing: React.FC = () => {
//   const [skills, setSkills] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [type, setType] = useState("All");
//   const [level, setLevel] = useState("All");
//   const [showForm, setShowForm] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "Technology",
//     level: "Intermediate",
//     type: "offer",
//     tags: "",
//   });

//   const fetchSkills = async () => {
//     try {
//       setLoading(true);
//       const params: any = {};
//       if (category !== "All") params.category = category;
//       if (type !== "All") params.type = type;
//       if (level !== "All") params.level = level;
//       if (search) params.search = search;
//       const res = await api.get("/skills", { params });
//       setSkills(res.data.skills);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchSkills(); }, [category, type, level]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     fetchSkills();
//   };

//   const handleAIDescribe = async () => {
//     if (!form.title || !form.category) return;
//     try {
//       setAiLoading(true);
//       const res = await api.post("/ai/describe", {
//         title: form.title,
//         category: form.category,
//         level: form.level,
//       });
//       setForm((f) => ({ ...f, description: res.data.description }));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setSubmitting(true);
//       await api.post("/skills", {
//         ...form,
//         tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
//       });
//       setShowForm(false);
//       setForm({ title: "", description: "", category: "Technology", level: "Intermediate", type: "offer", tags: "" });
//       fetchSkills();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all";
//   const selectClass = `${inputClass} cursor-pointer`;

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50">
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

//         {/* Header */}
//         <div className="flex items-start justify-between flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold text-slate-100">Browse Skills</h1>
//             <p className="text-slate-400 mt-1 text-sm">Discover skills to learn or find people to teach</p>
//           </div>
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all"
//           >
//             {showForm ? "✕ Cancel" : "+ Add Skill"}
//           </button>
//         </div>

//         {/* Add Skill Form */}
//         {showForm && (
//           <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
//             <h2 className="text-lg font-bold text-slate-100">Add New Skill</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

//               <div className="md:col-span-2">
//                 <label className="text-xs text-slate-400 mb-1 block">Title *</label>
//                 <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. React.js Development" required />
//               </div>

//               <div>
//                 <label className="text-xs text-slate-400 mb-1 block">Category *</label>
//                 <select className={selectClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
//                   {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
//                 </select>
//               </div>

//               <div>
//                 <label className="text-xs text-slate-400 mb-1 block">Level</label>
//                 <select className={selectClass} value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
//                   {LEVELS.filter((l) => l !== "All").map((l) => <option key={l}>{l}</option>)}
//                 </select>
//               </div>

//               <div>
//                 <label className="text-xs text-slate-400 mb-1 block">Type *</label>
//                 <select className={selectClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
//                   <option value="offer">I'm Offering this skill</option>
//                   <option value="request">I'm Looking to Learn this</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-xs text-slate-400 mb-1 block">Tags (comma-separated)</label>
//                 <input className={inputClass} value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="react, javascript, frontend" />
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-1">
//                   <label className="text-xs text-slate-400">Description *</label>
//                   <button
//                     type="button"
//                     onClick={handleAIDescribe}
//                     disabled={aiLoading || !form.title}
//                     className="text-xs text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-lg hover:bg-indigo-500/20 disabled:opacity-50 transition-all font-semibold"
//                   >
//                     {aiLoading ? "Generating..." : "✦ AI Generate"}
//                   </button>
//                 </div>
//                 <textarea
//                   className={`${inputClass} min-h-[90px] resize-y`}
//                   value={form.description}
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                   placeholder="Describe what you can teach or want to learn..."
//                   required
//                 />
//               </div>

//               <div className="md:col-span-2 flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm disabled:opacity-60 transition-all"
//                 >
//                   {submitting ? "Saving..." : "Save Skill"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Search + Filters */}
//         <div className="flex flex-wrap gap-3">
//           <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
//             <input
//               className={`${inputClass} flex-1`}
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search skills..."
//             />
//             <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all">
//               Search
//             </button>
//           </form>
//           <select className={`${selectClass} w-36`} value={category} onChange={(e) => setCategory(e.target.value)}>
//             {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
//           </select>
//           <select className={`${selectClass} w-32`} value={type} onChange={(e) => setType(e.target.value)}>
//             {TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t === "offer" ? "Offering" : "Seeking"}</option>)}
//           </select>
//           <select className={`${selectClass} w-36`} value={level} onChange={(e) => setLevel(e.target.value)}>
//             {LEVELS.map((l) => <option key={l}>{l}</option>)}
//           </select>
//         </div>

//         {/* Skills Grid */}
//         {loading ? (
//           <div className="text-center text-slate-500 py-16">Loading skills...</div>
//         ) : skills.length === 0 ? (
//           <div className="text-center text-slate-500 py-16">
//             <div className="text-5xl mb-3">🔍</div>
//             <p>No skills found. Be the first to add one!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {skills.map((skill) => (
//               <SkillCard key={skill._id} skill={skill} showUser={true} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SkillListing;
// src/pages/SkillListing.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";
import api from "../api";

const CATEGORIES = ["All","Technology","Design","Music","Language","Cooking","Fitness","Business","Art","Education","Other"];
const TYPES = ["All", "offer", "request"];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const SkillListing: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [mySkills, setMySkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [level, setLevel] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Exchange modal state
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [mySkillId, setMySkillId] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Technology",
    level: "Intermediate",
    type: "offer",
    tags: "",
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (category !== "All") params.category = category;
      if (type !== "All") params.type = type;
      if (level !== "All") params.level = level;
      if (search) params.search = search;
      const [skillsRes, mySkillsRes] = await Promise.all([
        api.get("/skills", { params }),
        api.get("/skills/my"),
      ]);
      setSkills(skillsRes.data.skills);
      setMySkills(mySkillsRes.data.skills);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, [category, type, level]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSkills();
  };

  const handleAIDescribe = async () => {
    if (!form.title || !form.category) return;
    try {
      setAiLoading(true);
      const res = await api.post("/ai/describe", {
        title: form.title,
        category: form.category,
        level: form.level,
      });
      setForm((f) => ({ ...f, description: res.data.description }));
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/skills", {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      setShowForm(false);
      setForm({ title: "", description: "", category: "Technology", level: "Intermediate", type: "offer", tags: "" });
      fetchSkills();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConnect = (skill: any) => {
    setSelectedSkill(skill);
    setMySkillId(mySkills.length > 0 ? mySkills[0]._id : "");
    setMessage("");
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mySkillId) {
      setErrorMsg("Please add a skill first before sending a request!");
      return;
    }
    try {
      setSending(true);
      setErrorMsg("");
      await api.post("/exchanges", {
        receiverId: selectedSkill.user._id,
        senderSkillId: mySkillId,
        receiverSkillId: selectedSkill._id,
        message,
      });
      setSuccessMsg(`Exchange request sent to ${selectedSkill.user.name}! 🎉`);
      setTimeout(() => {
        setSelectedSkill(null);
        setSuccessMsg("");
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Failed to send request. Try again!");
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all";
  const selectClass = `${inputClass} cursor-pointer`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-100">Browse Skills</h1>
            <p className="text-slate-400 mt-1 text-sm">Discover skills to learn or find people to teach</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all"
          >
            {showForm ? "✕ Cancel" : "+ Add Skill"}
          </button>
        </div>

        {/* Add Skill Form */}
        {showForm && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-100">Add New Skill</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs text-slate-400 mb-1 block">Title *</label>
                <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. React.js Development" required />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Category *</label>
                <select className={selectClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Level</label>
                <select className={selectClass} value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                  {LEVELS.filter((l) => l !== "All").map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Type *</label>
                <select className={selectClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="offer">I'm Offering this skill</option>
                  <option value="request">I'm Looking to Learn this</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Tags (comma-separated)</label>
                <input className={inputClass} value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="react, javascript, frontend" />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-slate-400">Description *</label>
                  <button
                    type="button"
                    onClick={handleAIDescribe}
                    disabled={aiLoading || !form.title}
                    className="text-xs text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-lg hover:bg-indigo-500/20 disabled:opacity-50 transition-all font-semibold"
                  >
                    {aiLoading ? "Generating..." : "✦ AI Generate"}
                  </button>
                </div>
                <textarea
                  className={`${inputClass} min-h-[90px] resize-y`}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what you can teach or want to learn..."
                  required
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm disabled:opacity-60 transition-all">
                  {submitting ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-3">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
            <input className={`${inputClass} flex-1`} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search skills..." />
            <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all">Search</button>
          </form>
          <select className={`${selectClass} w-36`} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className={`${selectClass} w-32`} value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t === "offer" ? "Offering" : "Seeking"}</option>)}
          </select>
          <select className={`${selectClass} w-36`} value={level} onChange={(e) => setLevel(e.target.value)}>
            {LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="text-center text-slate-500 py-16">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="text-center text-slate-500 py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p>No skills found. Be the first to add one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                showUser={true}
                onAction={() => handleConnect(skill)}
                actionLabel="Connect"
              />
            ))}
          </div>
        )}
      </div>

      {/* Exchange Request Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-5 shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100">Send Exchange Request</h2>
              <button onClick={() => setSelectedSkill(null)} className="text-slate-400 hover:text-slate-200 text-xl">✕</button>
            </div>

            {/* Their skill */}
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
              <p className="text-xs text-indigo-400 font-semibold mb-1">THEY OFFER</p>
              <p className="text-base font-bold text-slate-100">{selectedSkill.title}</p>
              <p className="text-xs text-slate-400 mt-1">{selectedSkill.category} • {selectedSkill.level}</p>
              <p className="text-xs text-slate-500 mt-1">by {selectedSkill.user?.name}</p>
            </div>

            {successMsg ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-400 text-sm font-semibold text-center">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-4">

                {/* My skill selector */}
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Your Skill to Offer in Return *</label>
                  {mySkills.length === 0 ? (
                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-yellow-400 text-xs">
                      You have no skills listed yet. Add a skill first from this page!
                    </div>
                  ) : (
                    <select
                      className={selectClass}
                      value={mySkillId}
                      onChange={(e) => setMySkillId(e.target.value)}
                      required
                    >
                      {mySkills.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.title} ({s.category})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Message (optional)</label>
                  <textarea
                    className={`${inputClass} min-h-[80px] resize-none`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi! I'd love to exchange skills with you..."
                  />
                </div>

                {errorMsg && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-400 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending || mySkills.length === 0}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold disabled:opacity-60 transition-all"
                  >
                    {sending ? "Sending..." : "Send Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillListing;