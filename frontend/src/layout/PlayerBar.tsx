import type { Track } from "../types/media";
import ProgressBar from "../components/ProgressBar";

interface Props {
    track: Track;
}

const PlayerBar = ({ track }: Props) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/70 backdrop-blur-2xl border-t border-neutral-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 w-1/4">
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

            <div className="flex flex-col items-center w-2/4 gap-2">
                <div className="flex items-center gap-6 text-lg">
                    <button>⏮</button>
                    <button className="bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center">
                        ▶
                    </button>
                    <button>⏭</button>
                </div>
                <ProgressBar value={40} />
            </div>

            <div className="w-1/4 flex justify-end">
                <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={70}
                    className="w-32 accent-emerald-500"
                />
            </div>
        </div>
    );
};

export default PlayerBar;
