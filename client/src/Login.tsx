import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { apiRequest } from "./api";
import type { LoginResponse } from "./types";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("uday@example.com");
    const [password, setPassword] = useState<string>("password123");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiRequest<LoginResponse>("/auth/login", "POST", {
                email,
                password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="SkillSwap"
            subtitle="Log in to manage your skills and matches"
        >
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-200">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-200">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 hover:from-sky-400 hover:to-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
                <p className="text-xs text-slate-500 text-center">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-sky-400 cursor-pointer hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
