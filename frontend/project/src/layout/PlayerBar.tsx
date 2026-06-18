import ProgressBar from "../components/ProgressBar";
import { usePlayer } from "../contexts/playerContext";
import {
    Play,
    SkipForward,
    Pause,
    Volume2,
    ListPlus,
    SkipBack,
    VolumeX,
} from "lucide-react";
import { formatDuration } from "../helper/formatDutation";
import AddToPlaylistModal from "../pages/playLists/components/AddToPlaylistModal";
import { useState, useRef } from "react";

const PlayerBar = () => {
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const previousVolumeRef = useRef(100);
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

    const volumeToggleHandler = () => {
        if (volume > 0) {
            previousVolumeRef.current = volume;
            setVolume(0);
        } else {
            setVolume(previousVolumeRef.current);
        }
    };

    return (
        <>
            {showPlaylistModal && (
                <AddToPlaylistModal
                    songId={track.id}
                    onClose={() => setShowPlaylistModal(false)}
                />
            )}

            {/* Mobile player bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/70 backdrop-blur-2xl border-t border-neutral-800">
                <ProgressBar value={progress} onChange={handleProgressChange} />
                <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                            src={track.cover_url}
                            alt={track.title}
                            className="w-11 h-11 rounded-lg shrink-0 object-cover"
                        />
                        <div className="min-w-0">
                            <div className="font-semibold text-sm text-white truncate">
                                {track.title}
                            </div>
                            <div className="text-xs text-neutral-400 truncate">
                                {track.artist}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={playPrevious}
                            className="text-white cursor-pointer p-1.5"
                        >
                            <SkipBack size={18} />
                        </button>
                        <button
                            onClick={playToggle}
                            className="bg-emerald-500 text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shrink-0"
                        >
                            {isPlaying ? (
                                <Pause size={16} />
                            ) : (
                                <Play size={16} />
                            )}
                        </button>
                        <button
                            onClick={playNext}
                            className="text-white cursor-pointer p-1.5"
                        >
                            <SkipForward size={18} />
                        </button>
                        <button
                            onClick={() => setShowPlaylistModal(true)}
                            className="text-white cursor-pointer p-1.5"
                        >
                            <ListPlus size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop / tablet player bar */}
            <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-80 bg-neutral-900/70 backdrop-blur-2xl border-t border-neutral-800 px-4 py-1 items-center gap-4 lg:gap-8">
                <div className="flex items-center gap-4 w-44 lg:w-56 xl:w-64 shrink-0 min-w-0">
                    <img
                        src={track.cover_url}
                        alt={track.title}
                        className="w-14 h-14 rounded-xl shrink-0 object-cover"
                    />
                    <div className="min-w-0">
                        <div className="font-semibold text-sm text-white truncate">
                            {track.title}
                        </div>
                        <div className="text-xs text-neutral-400 truncate">
                            {track.artist}
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-1 min-w-0 max-w-xs lg:max-w-xl xl:max-w-2xl mx-auto gap-4 lg:gap-6">
                    <div className="flex items-center gap-4 text-lg shrink-0">
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

                <div className="relative flex justify-end items-center gap-x-3 w-20 shrink-0">
                    <div className="group relative pt-1">
                        <button
                            onClick={volumeToggleHandler}
                            className="cursor-pointer text-white"
                        >
                            {volume === 0 ? (
                                <VolumeX size={16} />
                            ) : (
                                <Volume2 size={16} />
                            )}
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
