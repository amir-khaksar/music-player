import { createContext, useContext, useRef, useState, useEffect } from "react";
import type { Track } from "./../types/media";

interface PlayerContextType {
    track: Track | null;
    setTrack: (track: Track, queue?: Track[]) => void;
    isPlaying: boolean;
    setIsPlaying: (v: boolean) => void;
    playToggle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    progress: number;
    volume: number;
    setVolume: (v: number) => void;
    handleProgressChange: (v: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [track, setTrackState] = useState<Track | null>(null);
    const [queue, setQueue] = useState<Track[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(50);

    const setTrack = (newTrack: Track, newQueue?: Track[]) => {
        if (newQueue && newQueue.length > 0) {
            const idx = newQueue.findIndex((t) => t.id === newTrack.id);
            setQueue(newQueue);
            setCurrentIndex(idx === -1 ? 0 : idx);
        } else {
            setQueue([newTrack]);
            setCurrentIndex(0);
        }
        setTrackState(newTrack);
        setProgress(0);
        setIsPlaying(false);
    };

    const playToggle = () => setIsPlaying((p) => !p);

    const playNext = () => {
        if (queue.length === 0) return;
        const nextIndex = (currentIndex + 1) % queue.length;
        setCurrentIndex(nextIndex);
        setTrackState(queue[nextIndex]);
        setProgress(0);
    };

    const playPrevious = () => {
        if (queue.length === 0) return;
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
        setCurrentIndex(prevIndex);
        setTrackState(queue[prevIndex]);
        setProgress(0);
    };

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
                playNext,
                playPrevious,
                hasNext: queue.length > 1,
                hasPrevious: queue.length > 1,
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
                    onEnded={playNext}
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
