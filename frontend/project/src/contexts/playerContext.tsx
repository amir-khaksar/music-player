import { createContext, useContext, useRef, useState, useEffect } from "react";
import type { Track } from "./../types/media";

interface PlayerContextType {
    track: Track | null;
    setTrack: (track: Track) => void;
    isPlaying: boolean;
    setIsPlaying: (v: boolean) => void;
    playToggle: () => void;
    progress: number;
    volume: number;
    setVolume: (v: number) => void;
    handleProgressChange: (v: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [track, setTrackState] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(50);

    const setTrack = (newTrack: Track) => {
        setTrackState(newTrack);
        setProgress(0);
        setIsPlaying(false);
    };

    const playToggle = () => setIsPlaying((p) => !p);

    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        if (!track || !audioRef.current) return;
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
    }, [track?.id]);

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
        <PlayerContext.Provider
            value={{
                track,
                setTrack,
                isPlaying,
                setIsPlaying,
                playToggle,
                progress,
                volume,
                setVolume,
                handleProgressChange,
            }}
        >
            {track && (
                <audio
                    ref={audioRef}
                    src={track.audio_url}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                />
            )}
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const ctx = useContext(PlayerContext);
    if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
    return ctx;
}
