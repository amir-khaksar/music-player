import Loading from "../../components/Loading";
import { useGetPlaylists } from "./hooks/useGetPlaylists";
import { ListMusic, Plus, Clock, ArrowRight, Trash2 } from "lucide-react";
import { CreatePlaylistModal } from "./components/modal";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRemovePlaylist } from "./hooks/useRemovePlaylist";

interface Playlist {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("En", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function PlayLists() {
    const [showModal, setShowModal] = useState(false);

    const { data: playlists, isLoading } = useGetPlaylists();
    const { mutate: deletePlaylist } = useRemovePlaylist();

    const navigate = useNavigate();

    const trashClickHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        playlistId: string,
    ) => {
        e.stopPropagation();
        deletePlaylist(playlistId);
    };

    return (
        <div className="w-full bg-neutral-950 p-8 relative overflow-hidden">
            <div className="relative z-10 max-w-9xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-white/90 text-2xl font-semibold">
                            playlists
                        </h1>
                        <p className="text-white/35 text-sm mt-1">
                            {playlists?.length ?? 0} playlist
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/85 hover:bg-emerald-600/90 active:scale-95 border border-emerald-400/40 backdrop-blur-sm rounded-xl text-white text-sm font-medium transition-all duration-200 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                    >
                        <Plus size={16} />
                        New PlayList
                    </button>
                </div>

                {/* Loading */}
                {isLoading && <Loading />}

                {/* Empty state */}
                {!isLoading && playlists?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/10 flex items-center justify-center">
                            <ListMusic size={28} className="text-white/20" />
                        </div>
                        <p className="text-white/30 text-sm">
                            You haven't created a playlist yet.
                        </p>
                    </div>
                )}
                {!isLoading && playlists?.length > 0 && (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {playlists.map((playlist: Playlist) => (
                            <div
                                onClick={() =>
                                    navigate(
                                        `/discover/playlists/${playlist.id}`,
                                    )
                                }
                                key={playlist.id}
                                className="group flex items-center gap-4 bg-white/4 hover:bg-white/6 backdrop-blur-sm border border-white/8 hover:border-white/15 rounded-2xl px-5 py-4 cursor-pointer transition-all duration-200"
                            >
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/15 transition-colors duration-200">
                                    <ListMusic
                                        size={20}
                                        className="text-emerald-400"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white/85 text-sm font-medium truncate">
                                        {playlist.name}
                                    </h3>
                                    {playlist.created_at && (
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock
                                                size={11}
                                                className="text-white/25"
                                            />
                                            <span className="text-white/25 text-xs">
                                                {formatDate(
                                                    playlist.created_at,
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-y-4">
                                    <button
                                        className="cursor-pointer"
                                        onClick={(e) =>
                                            trashClickHandler(e, playlist.id)
                                        }
                                    >
                                        <Trash2
                                            size={16}
                                            className="text-red-600"
                                        />
                                    </button>
                                    <button className="cursor-pointer">
                                        <ArrowRight
                                            size={16}
                                            className="text-white/25"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Outlet />
            {showModal && (
                <CreatePlaylistModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}
