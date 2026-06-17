import type { Track } from "../types/media";
import { Play, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../contexts/playerContext";

interface Props {
    track: Track;
    queue?: Track[];
    onRemove?: (trackId: string) => void;
}

const TrackCard = ({ track, queue, onRemove }: Props) => {
    const navigate = useNavigate();
    const { track: currentTrack, setTrack, playToggle } = usePlayer();

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentTrack?.id !== track.id) {
            setTrack(track, queue);
        } else {
            playToggle();
        }
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove?.(track.id);
    };

    return (
        <div
            onClick={() => navigate(`/discover/music/${track?.id}`)}
            className="group bg-neutral-900 p-4 rounded-2xl hover:bg-neutral-800 transition relative shadow-lg cursor-pointer"
        >
            <div className="relative">
                <img
                    src={track?.cover_url}
                    alt={track?.title}
                    className="rounded-xl mb-4 w-full"
                />

                {onRemove && (
                    <button
                        onClick={handleRemoveClick}
                        className="absolute top-2 sm:bottom-3 sm:right-3 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-black/60 hover:bg-red-600/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    >
                        <Trash2 size={13} className="sm:w-4 sm:h-4" />
                    </button>
                )}

                <button
                    onClick={handlePlayClick}
                    className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-emerald-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0 sm:translate-y-3 sm:group-hover:translate-y-0 transition cursor-pointer"
                >
                    <Play size={14} className="sm:w-4 sm:h-4" />
                </button>
            </div>
            <div className="font-semibold sm:font-normal">{track?.title}</div>
            <div className="text-sm text-neutral-400">{track?.artist}</div>
        </div>
    );
};

export default TrackCard;
