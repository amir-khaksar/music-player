import ProgressBar from "../components/ProgressBar";
import { usePlayer } from "../contexts/playerContext";
import {
    Play,
    SkipForward,
    Pause,
    Volume2,
    ListPlus,
    SkipBack,
} from "lucide-react";
import { formatDuration } from "../helper/formatDutation";
import AddToPlaylistModal from "../pages/playLists/components/AddToPlaylistModal";
import { useState } from "react";

const PlayerBar = () => {
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    const {
        track,
        isPlaying,
        playToggle,
        playNext,
        playPrevious,
        progress,
        volume,
        setVolume,
        handleProgressChange,
    } = usePlayer();

    if (!track) return null;

    const currentTime = track.duration ? (progress / 100) * track.duration : 0;

    return (
        <>
            {showPlaylistModal && (
                <AddToPlaylistModal
                    songId={track.id}
                    onClose={() => setShowPlaylistModal(false)}
                />
            )}
            <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/70 backdrop-blur-2xl border-t border-neutral-800 px-2 py-1 flex items-center justify-center gap-x-8">
                <div className="flex items-center gap-4">
                    <img
                        src={track.cover_url}
                        alt={track.title}
                        className="w-14 h-14 rounded-xl"
                    />
                    <div>
                        <div className="font-semibold text-sm text-white">
                            {track.title}
                        </div>
                        <div className="text-xs text-neutral-400">
                            {track.artist}
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-2xl gap-6">
                    <div className="flex items-center gap-4 text-lg">
                        <button
                            onClick={playPrevious}
                            className="cursor-pointer text-white"
                        >
                            <SkipBack size={16} />
                        </button>
                        <button
                            onClick={playToggle}
                            className="bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                        >
                            {isPlaying ? (
                                <Pause size={16} />
                            ) : (
                                <Play size={16} />
                            )}
                        </button>
                        <button
                            onClick={playNext}
                            className="cursor-pointer text-white"
                        >
                            <SkipForward size={16} />
                        </button>
                    </div>

                    <div className="w-full mt-6">
                        <ProgressBar
                            value={progress}
                            onChange={handleProgressChange}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-white/25 text-xs">
                                {formatDuration(Math.floor(currentTime))}
                            </span>
                            <span className="text-white/25 text-xs">
                                {track.duration
                                    ? formatDuration(track.duration)
                                    : "--:--"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative flex justify-end items-center gap-x-3">
                    <div className="group relative pt-1">
                        <button className="cursor-pointer text-white">
                            <Volume2 size={16} />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={volume}
                                onChange={(e) =>
                                    setVolume(Number(e.target.value))
                                }
                                className="h-24 rotate-180 accent-emerald-500"
                                style={{ writingMode: "vertical-rl" }}
                            />
                        </div>
                    </div>
                    <button onClick={() => setShowPlaylistModal(true)}>
                        <ListPlus
                            size={16}
                            className="cursor-pointer text-white"
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default PlayerBar;
