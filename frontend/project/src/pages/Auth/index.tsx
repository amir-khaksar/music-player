import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

type Mode = "login" | "register";

export default function AuthPage() {
    const [mode, setMode] = useState<Mode>("login");

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Glow orbs */}
            <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
            <div className="w-full max-w-sm relative z-10">
                {/* Tab switcher */}
                <div className="flex gap-1 bg-white/4 backdrop-blur-md border border-white/8 rounded-2xl p-1 mb-5">
                    {(["login", "register"] as Mode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                mode === m
                                    ? "bg-emerald-500/85 text-white backdrop-blur-sm border border-emerald-400/40 shadow-lg shadow-emerald-900/30"
                                    : "text-white/30 hover:text-white/50"
                            }`}
                        >
                            {m === "login" ? "login" : "register"}
                        </button>
                    ))}
                </div>

                {/* Glass card */}
                <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.4)]">
                    {mode === "login" ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
}
