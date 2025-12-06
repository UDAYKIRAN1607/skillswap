import React from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-emerald-500/10 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-50 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl shadow-sky-900/30 p-6 backdrop-blur">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
