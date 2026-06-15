import { useNavigate, useParams } from "react-router-dom";
import { useGetSong } from "./hooks/useGetSong";
import { usePlayer } from "../../contexts/playerContext";
import { ArrowLeft, Heart, Pause, Play, ListPlus } from "lucide-react";
import Loading from "../../components/Loading";
import PlayerBar from "../../layout/PlayerBar";
import NotFound from "../not-found";
import { useState } from "react";
import { useLikeSong } from "./hooks/useLikeSong";
import { useGetLikedSongs } from "./hooks/useGetLikedSongs";
import { useUnlikeSong } from "./hooks/useUnlikeSong";
import AddToPlaylistModal from "../playLists/components/AddToPlaylistModal";

function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SongDetail() {
    const [like, setLike] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: song, isLoading } = useGetSong(id!);
    const { mutate: likeSong } = useLikeSong();
    const { mutate: unlikeSong } = useUnlikeSong();
    const { data: likedSongs } = useGetLikedSongs();

    const { setTrack, playToggle, track, isPlaying } = usePlayer();

    if (isLoading) return <Loading />;
    if (!song) return <NotFound />;

    const handlePlay = () => {
        if (track?.id !== song.id) {
            setTrack(song);
        } else {
            playToggle();
        }
    };

    const clickHandler = () => {
        setLike((prev) => !prev);
        if (isLiked) {
            unlikeSong(song.id);
        } else {
            likeSong(song.id);
        }
    };

    const isLiked = likedSongs?.some((s: any) => s.song_id === song.id);

    return (
        <div>
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 w-full max-w-sm">
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

                    <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.5)]">
                        <div className="relative mb-7 group">
                            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <img
                                    src={song?.cover_url}
                                    alt={song?.title}
                                    className="w-96 h-full object-cover"
                                />
                            </div>

                            <button
                                onClick={clickHandler}
                                className="absolute top-3 right-3 w-9 h-9 rounded-xl cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 transition-colors duration-200"
                            >
                                <Heart
                                    size={16}
                                    fill={`${isLiked ? "#00B96B" : "none"}`}
                                />
                            </button>
                            <button
                                onClick={() => setShowPlaylistModal(true)}
                                className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 transition-colors duration-200"
                            >
                                <ListPlus size={16} />
                            </button>
                            <button
                                onClick={handlePlay}
                                className="absolute text-white inset-0 m-auto w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-200 cursor-pointer shadow-lg"
                            >
                                {isPlaying && track?.id === song.id ? (
                                    <Pause size={18} />
                                ) : (
                                    <Play size={18} />
                                )}
                            </button>
                        </div>

                        <div className="w-full h-px bg-white/6 mb-6" />

                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-white/90 text-xl font-semibold truncate">
                                    {song?.title}
                                </h1>
                                <p className="text-white/45 text-sm mt-1 truncate">
                                    {song?.artist}
                                </p>
                                {song?.album && (
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
                    </div>
                </div>
            </div>
            {showPlaylistModal && (
                <AddToPlaylistModal
                    songId={song.id}
                    onClose={() => setShowPlaylistModal(false)}
                />
            )}
            <PlayerBar />
        </div>
    );
}
