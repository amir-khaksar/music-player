import { useState } from "react";

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

function LoginForm() {
    return (
        <div className="flex flex-col gap-4">
            <div className="mb-1">
                <h2 className="text-white/90 text-lg font-medium">
                    welcome back
                </h2>
                <p className="text-white/35 text-sm mt-1">
                    Log in to your account.
                </p>
            </div>

            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="password" type="password" placeholder="••••••••" />

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="remember"
                    className="accent-emerald-500"
                />
                <label htmlFor="remember" className="text-white/35 text-xs">
                    Remember me.
                </label>
            </div>

            <AuthButton label="login" />
        </div>
    );
}

function RegisterForm() {
    return (
        <div className="flex flex-col gap-4">
            <div className="mb-1">
                <h2 className="text-white/90 text-lg font-medium">
                    Create an account
                </h2>
                <p className="text-white/35 text-sm mt-1">
                    Get started for free
                </p>
            </div>

            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="password" type="password" placeholder="••••••••" />

            <AuthButton label="register" />
        </div>
    );
}

function Field({
    label,
    type,
    placeholder,
}: {
    label: string;
    type: string;
    placeholder: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-white/40 text-xs">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="bg-white/5 backdrop-blur-sm border border-white/8 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 rounded-xl px-4 py-2.5 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-200"
            />
        </div>
    );
}

function AuthButton({ label }: { label: string }) {
    return (
        <button className="w-full cursor-pointer mt-1 py-3 bg-emerald-500/85 hover:bg-emerald-600/90 active:scale-[0.98] backdrop-blur-sm border border-emerald-400/40 rounded-xl text-white text-sm font-medium transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_20px_rgba(16,185,129,0.2)]">
            {label}
        </button>
    );
}
