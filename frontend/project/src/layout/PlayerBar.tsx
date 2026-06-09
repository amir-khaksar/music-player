import { useState, useRef, useEffect } from "react";
import type { Track } from "../types/media";
import ProgressBar from "../components/ProgressBar";
import {
    Play,
    SkipForward,
    Pause,
    Volume2,
    Shuffle,
    SkipBack,
} from "lucide-react";

interface Props {
    track: Track;
}

const PlayerBar = ({ track }: Props) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(50);

    // play & pause
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);

    // volume
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    // When the track changes, start over.
    useEffect(() => {
        setProgress(0);
        setIsPlaying(false);
    }, [track.id]);

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleProgressChange = (value: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = (value / 100) * audio.duration;
        setProgress(value);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/70 backdrop-blur-2xl border-t border-neutral-800 px-2 py-1 flex items-center justify-center gap-x-8">
            <audio
                ref={audioRef}
                src={track.audio_url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="flex items-center gap-4">
                <img
                    src={track.image}
                    alt={track.title}
                    className="w-14 h-14 rounded-xl"
                />
                <div>
                    <div className="font-semibold text-sm">{track.title}</div>
                    <div className="text-xs text-neutral-400">
                        {track.artist}
                    </div>
                </div>
            </div>

            <div className="flex items-center w-2xl gap-6">
                <div className="flex items-center gap-4 text-lg">
                    <button className="cursor-pointer">
                        <SkipBack size={16} />
                    </button>
                    <button
                        onClick={() => setIsPlaying((p) => !p)}
                        className="bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button className="cursor-pointer">
                        <SkipForward size={16} />
                    </button>
                </div>

                <ProgressBar value={progress} onChange={handleProgressChange} />
            </div>

            <div className="relative flex justify-end items-center gap-x-3">
                <div className="group relative pt-1">
                    <button className="cursor-pointer">
                        <Volume2 size={16} />
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="h-24 rotate-180 accent-emerald-500"
                            style={{ writingMode: "vertical-rl" }}
                        />
                    </div>
                </div>
                <Shuffle size={16} className="cursor-pointer" />
            </div>
        </div>
    );
};

export default PlayerBar;
