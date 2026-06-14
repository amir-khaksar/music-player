import { useState } from "react";
import { useGetSongs } from "./../../pages/home/hooks/useGetSongs";
import { useDeleteSong } from "./hooks/useDeleteSong";
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Track } from "../../types/media";
import Loading from "../../components/Loading";

export default function AdminPage() {
    const navigate = useNavigate();
    const { data, isLoading } = useGetSongs();
    const { mutate: deleteSong, isPending } = useDeleteSong();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const songs: Track[] = data?.songs ?? [];

    const handleDelete = (id: string) => {
        setDeletingId(id);
        deleteSong(id, { onSettled: () => setDeletingId(null) });
    };

    return (
        <div className="min-h-screen bg-neutral-950 p-8 relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-white/90 text-2xl font-semibold">
                            Admin Panel
                        </h1>
                        <p className="text-white/35 text-sm mt-1">
                            {songs.length} song
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/upload")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/85 hover:bg-emerald-600/90 active:scale-95 border border-emerald-400/40 rounded-xl text-white text-sm font-medium transition-all duration-200 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                    >
                        <Plus size={16} />
                        New Song
                    </button>
                </div>

                {isLoading && <Loading />}

                <div className="flex flex-col gap-2">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="flex items-center gap-4 bg-white/4 border border-white/8 rounded-2xl px-5 py-3 transition-all duration-200"
                        >
                            <img
                                src={song.cover_url}
                                alt={song.title}
                                className="w-11 h-11 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-white/85 text-sm font-medium truncate">
                                    {song.title}
                                </p>
                                <p className="text-white/35 text-xs mt-0.5 truncate">
                                    {song.artist}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(song.id)}
                                disabled={deletingId === song.id || isPending}
                                className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 flex items-center justify-center text-red-400 transition-all duration-200 disabled:opacity-40 shrink-0"
                            >
                                {deletingId === song.id ? (
                                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                ) : (
                                    <Trash2 size={15} />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
