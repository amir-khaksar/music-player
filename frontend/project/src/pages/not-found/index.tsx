import { SearchAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Glow orbs */}
            <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                {/* 404 glass card */}
                <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-3xl px-16 py-12 mb-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
                    {/* inner glow */}
                    <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl pointer-events-none" />

                    {/* 404 text */}
                    <p className="text-[96px] font-bold leading-none tracking-tighter bg-linear-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent select-none">
                        404
                    </p>

                    {/* divider */}
                    <div className="w-12 h-px bg-emerald-500/40 mx-auto mt-5 mb-5" />

                    {/* icon */}
                    <SearchAlert
                        size={30}
                        className="text-emerald-500/60 mx-auto mb-2"
                    />
                </div>

                {/* Text */}
                <h1 className="text-white/90 text-2xl font-medium mb-3">
                    page not found
                </h1>
                <p className="text-white/35 text-sm leading-relaxed mb-10 max-w-xs">
                    The page you are looking for does not exist, has been
                    deleted, or its address has changed.
                </p>

                {/* Buttons */}
                <div className="flex gap-3 w-full max-w-xs">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/8 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-xl text-white/60 hover:text-white/80 text-sm font-medium transition-all duration-200"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => navigate("/auth")}
                        className="flex-1 py-2.5 bg-emerald-500/85 hover:bg-emerald-600/90 active:scale-[0.98] backdrop-blur-sm border border-emerald-400/40 rounded-xl text-white text-sm font-medium transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_20px_rgba(16,185,129,0.2)]"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}
