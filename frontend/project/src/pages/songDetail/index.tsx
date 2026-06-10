import { useNavigate, useParams } from "react-router-dom";
import { useGetSong } from "./hooks/useGetSong";
import {
    ArrowLeft,
    Heart,
    Play,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
} from "lucide-react";
import Loading from "../../components/Loading";

function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SongDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: song, isLoading } = useGetSong(id!);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Glow orbs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors duration-200 group"
                >
                    <ArrowLeft
                        className="group-hover:-translate-x-0.5 transition-transform duration-200"
                        size={16}
                    />
                    back
                </button>

                {/* Card */}
                <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.5)]">
                    {/* Cover */}
                    <div className="relative mb-7">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                            <img
                                src={song.cover_url}
                                alt={song.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <button className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 transition-colors duration-200">
                            <Heart size={16} />
                        </button>
                    </div>

                    {/* Info */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-white/90 text-xl font-semibold truncate">
                                {song.title}
                            </h1>
                            <p className="text-white/45 text-sm mt-1 truncate">
                                {song.artist}
                            </p>
                            {song.album && (
                                <p className="text-white/25 text-xs mt-0.5 truncate">
                                    {song.album}
                                </p>
                            )}
                        </div>
                        {song.duration && (
                            <span className="text-white/25 text-xs ml-4 mt-1 shrink-0">
                                {formatDuration(song.duration)}
                            </span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/6 mb-6" />

                    {/* Controls */}
                    <div className="flex items-center justify-between px-2">
                        {/* Shuffle */}
                        <button className="text-white/30 hover:text-white/60 transition-colors duration-200">
                            <Shuffle size={16} />
                        </button>

                        {/* Prev */}
                        <button className="text-white/50 hover:text-white/80 transition-colors duration-200">
                            <SkipBack />
                        </button>

                        {/* Play */}
                        <button className="w-14 h-14 rounded-2xl text-white bg-emerald-500/90 hover:bg-emerald-500 active:scale-95 border border-emerald-400/40 flex items-center justify-center transition-all duration-200 shadow-[0_4px_20px_rgba(16,185,129,0.35)]">
                            <Play />
                        </button>

                        {/* Next */}
                        <button className="text-white/50 hover:text-white/80 transition-colors duration-200">
                            <SkipForward />
                        </button>

                        {/* Repeat */}
                        <button className="text-white/30 hover:text-white/60 transition-colors duration-200">
                            <Repeat size={16} />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6">
                        <div className="w-full h-1 bg-white/8 rounded-full overflow-hidden">
                            <div className="h-full w-2/5 bg-emerald-500 rounded-full" />
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-white/25 text-xs">1:22</span>
                            <span className="text-white/25 text-xs">
                                {song.duration
                                    ? formatDuration(song.duration)
                                    : "--:--"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
