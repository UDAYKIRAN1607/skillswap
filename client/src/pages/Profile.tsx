// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";
import api from "../api";

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [mySkills, setMySkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", bio: "", location: "" });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [userRes, skillsRes] = await Promise.all([
                api.get("/users/me"),
                api.get("/skills/my"),
            ]);
            const userData = userRes.data.user || userRes.data;
            setUser(userData);
            setMySkills(skillsRes.data.skills);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        if (user) setForm({ name: user.name || "", bio: user.bio || "", location: user.location || "" });
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            await api.put("/users/me", form);
            setEditing(false);
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSkill = async (id: string) => {
        try {
            setDeleting(id);
            await api.delete(`/skills/${id}`);
            setMySkills((prev) => prev.filter((s) => s._id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(null);
        }
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all";

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950">
                <Navbar />
                <div className="text-center text-slate-500 py-16">Loading profile...</div>
            </div>
        );
    }

    const offerSkills = mySkills.filter((s) => s.type === "offer");
    const requestSkills = mySkills.filter((s) => s.type === "request");

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

                {/* Profile Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    {editing ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-100">Edit Profile</h2>
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Name</label>
                                <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Bio</label>
                                <textarea
                                    className={`${inputClass} min-h-[80px] resize-y`}
                                    value={form.bio}
                                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                    placeholder="Tell others about yourself..."
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Location</label>
                                <input className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Bangalore, India" />
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm disabled:opacity-60 transition-all">
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button type="button" onClick={() => setEditing(false)} className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex items-start gap-5 flex-wrap">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-2xl font-extrabold text-white shrink-0">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex-1">
                                <h1 className="text-2xl font-extrabold text-slate-100">{user?.name}</h1>
                                <p className="text-slate-400 text-sm mt-0.5">{user?.email}</p>
                                {user?.location && <p className="text-slate-500 text-sm mt-1">📍 {user.location}</p>}
                                {user?.bio && <p className="text-slate-400 text-sm mt-2 leading-relaxed">{user.bio}</p>}

                                <div className="flex gap-3 mt-3 flex-wrap">
                                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                                        {offerSkills.length} Offering
                                    </span>
                                    <span className="text-xs font-semibold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-3 py-1 rounded-full">
                                        {requestSkills.length} Seeking
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-all"
                            >
                                ✎ Edit
                            </button>
                        </div>
                    )}
                </div>

                {/* My Skills */}
                <div>
                    <h2 className="text-xl font-bold text-slate-100 mb-4">My Skills</h2>

                    {mySkills.length === 0 ? (
                        <div className="text-center py-12 rounded-2xl border border-dashed border-slate-700 text-slate-500">
                            <div className="text-4xl mb-2">🎯</div>
                            <p>No skills added yet. Go to Browse Skills to add some!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {mySkills.map((skill) => (
                                <div key={skill._id} className="flex flex-col gap-1">
                                    <SkillCard skill={skill} showUser={false} />
                                    <button
                                        onClick={() => handleDeleteSkill(skill._id)}
                                        disabled={deleting === skill._id}
                                        className="w-full py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
                                    >
                                        {deleting === skill._id ? "Deleting..." : "✕ Remove Skill"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;