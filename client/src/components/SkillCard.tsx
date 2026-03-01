// src/components/SkillCard.tsx
import React from "react";

interface SkillCardProps {
  skill: {
    _id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    type: string;
    tags?: string[];
    user?: { name: string; email: string; bio?: string };
  };
  onAction?: () => void;
  actionLabel?: string;
  showUser?: boolean;
}

const categoryColors: Record<string, string> = {
  Technology: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Design: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  Music: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Language: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Cooking: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Fitness: "text-green-400 bg-green-400/10 border-green-400/20",
  Business: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Art: "text-red-400 bg-red-400/10 border-red-400/20",
  Education: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Other: "text-slate-400 bg-slate-400/10 border-slate-400/20",
};

const levelColors: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-400/10",
  Intermediate: "text-yellow-400 bg-yellow-400/10",
  Advanced: "text-orange-400 bg-orange-400/10",
  Expert: "text-red-400 bg-red-400/10",
};

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onAction,
  actionLabel,
  showUser = true,
}) => {
  const catColor = categoryColors[skill.category] || categoryColors.Other;
  const lvlColor = levelColors[skill.level] || "text-slate-400 bg-slate-400/10";

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 flex flex-col gap-3 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-200">

      {/* Top row: category + type badge */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full border ${catColor}`}>
          {skill.category}
        </span>
        <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
          skill.type === "offer"
            ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20"
            : "text-red-400 bg-red-400/10 border border-red-400/20"
        }`}>
          {skill.type === "offer" ? "Offering" : "Seeking"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-100 leading-snug">
        {skill.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
        {skill.description}
      </p>

      {/* Tags */}
      {skill.tags && skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {skill.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {showUser && skill.user && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                {skill.user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-slate-500">{skill.user.name}</span>
            </div>
          )}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${lvlColor}`}>
            {skill.level}
          </span>
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all"
          >
            {actionLabel || "Connect"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillCard;