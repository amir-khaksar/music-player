import type { Track } from "../types/media";
import ProgressBar from "../components/ProgressBar";
import { SkipForward } from "lucide-react";
import { Pause, Volume2, Shuffle, SkipBack } from "lucide-react";

interface Props {
    track: Track;
}

const PlayerBar = ({ track }: Props) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/70 backdrop-blur-2xl border-t border-neutral-800 px-2 py-1 flex items-center justify-center gap-x-8">
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
                    <button className="bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                        <Pause size={16} />
                    </button>
                    <button className="cursor-pointer">
                        <SkipForward size={16} />
                    </button>
                </div>
                <ProgressBar value={85} />
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
                            defaultValue={50}
                            className="h-24 rotate-180 accent-emerald-500"
                            style={{
                                writingMode: "vertical-rl",
                            }}
                        />
                    </div>
                </div>
                <Shuffle size={16} />
            </div>
        </div>
    );
};

export default PlayerBar;
