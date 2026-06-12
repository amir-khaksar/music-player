import { X, ListMusic, Check } from "lucide-react";
import { useGetPlaylists } from "../hooks/useGetPlaylists";
import { useAddSongToPlaylist } from "./../hooks/useAddSongToMusic";
import { useState } from "react";
import { useModalStore } from "../../../store/useModalStore";

interface Props {
    songId: string;
    onClose: () => void;
}

export default function AddToPlaylistModal({ songId, onClose }: Props) {
    const { data: playlists, isLoading } = useGetPlaylists();
    const { mutate: addSong, isPending } = useAddSongToPlaylist();
    const [addedId, setAddedId] = useState<string | null>(null);

    const { showModal } = useModalStore();

    const handleAdd = (playlistId: string) => {
        addSong(
            { playlistId, songId },
            {
                onSuccess: () => {
                    setAddedId(playlistId);
                    setTimeout(onClose, 800);
                },
                onError: () => {
                    showModal({
                        type: "error",
                        title: "Add To Playlist failed",
                        message: "This song is already in the playlist",
                    });
                },
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
                className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/40 hover:text-white/70 transition-all duration-200"
                >
                    <X size={14} />
                </button>

                <div className="mb-6">
                    <h3 className="text-white/90 text-base font-medium">
                        Add to playlist{" "}
                    </h3>
                    <p className="text-white/35 text-xs mt-1">
                        Choose a playlist.
                    </p>
                </div>

                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                        </div>
                    )}

                    {!isLoading && playlists?.length === 0 && (
                        <p className="text-white/30 text-sm text-center py-8">
                            You don't have a playlist.
                        </p>
                    )}

                    {playlists?.map((playlist: any) => (
                        <button
                            key={playlist.id}
                            onClick={() => handleAdd(playlist.id)}
                            disabled={isPending || addedId === playlist.id}
                            className="flex cursor-pointer items-center gap-3 px-4 py-3 bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-xl transition-all duration-200 text-left disabled:opacity-60"
                        >
                            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                {addedId === playlist.id ? (
                                    <Check
                                        size={16}
                                        className="text-emerald-400"
                                    />
                                ) : (
                                    <ListMusic
                                        size={16}
                                        className="text-emerald-400"
                                    />
                                )}
                            </div>
                            <span className="text-white/80 text-sm font-medium flex-1 truncate">
                                {playlist.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
