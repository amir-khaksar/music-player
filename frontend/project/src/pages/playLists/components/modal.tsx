import { useState } from "react";
import { useCreatePlaylist } from "../hooks/useCreatePlaylist";
import { ListMusic, X } from "lucide-react";

export function CreatePlaylistModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const { mutate: createPlaylist, isPending } = useCreatePlaylist();

    const handleSubmit = () => {
        if (!name.trim()) return;
        createPlaylist(
            { name },
            {
                onSuccess: () => onClose(),
            },
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div
                className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Glow */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center cursor-pointer rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/40 hover:text-white/70 transition-all duration-200"
                >
                    <X size={14} />
                </button>

                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
                    <ListMusic size={22} className="text-emerald-400" />
                </div>

                <div className="text-center mb-7">
                    <h3 className="text-white/90 text-lg font-medium">
                        New PlayList
                    </h3>
                    <p className="text-white/35 text-sm mt-1">
                        Give your playlist a name.
                    </p>
                </div>

                <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-white/40 text-xs">
                        Playlist name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="For example: Morning music"
                        autoFocus
                        className="bg-white/5 backdrop-blur-sm border border-white/8 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 rounded-xl px-4 py-2.5 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-200"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 cursor-pointer bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-xl text-white/50 hover:text-white/75 text-sm font-medium transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim() || isPending}
                        className="flex-1 cursor-pointer py-2.5 bg-emerald-500/85 hover:bg-emerald-600/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-400/40 rounded-xl text-white text-sm font-medium transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                    >
                        {isPending ? "Creating" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
