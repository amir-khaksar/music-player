import type { Track } from "../types/media";
import { Play } from "lucide-react";

interface Props {
    track: Track;
}

const TrackCard = ({ track }: Props) => {
    return (
        <div className="group bg-neutral-900 p-4 rounded-2xl hover:bg-neutral-800 transition relative shadow-lg">
            <div className="relative">
                <img
                    src={track.image}
                    alt={track.title}
                    className="rounded-xl mb-4"
                />
                <button className="absolute bottom-4 right-4 bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition cursor-pointer">
                    <Play size={16} />
                </button>
            </div>
            <div className="font-semibold">{track.title}</div>
            <div className="text-sm text-neutral-400">{track.artist}</div>
        </div>
    );
};

export default TrackCard;
