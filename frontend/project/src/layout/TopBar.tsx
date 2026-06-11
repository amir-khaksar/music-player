import { useState } from "react";
import { useGetSongs } from "./../pages/home/hooks/useGetSongs";
import type { Track } from "../types/media";
import { usePlayer } from "../contexts/playerContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const [value, setValue] = useState("");
    const { data, isLoading } = useGetSongs();
    const { track: currentTrack } = usePlayer();
    const navigate = useNavigate();

    const results: Track[] =
        value.trim().length > 0
            ? (data?.songs ?? []).filter(
                  (track: Track) =>
                      track.title.toLowerCase().includes(value.toLowerCase()) ||
                      track.artist.toLowerCase().includes(value.toLowerCase()),
              )
            : [];

    return (
        <header className="flex items-center justify-between z-10 px-6 py-4 bg-neutral-950/70 backdrop-blur-xl border-b border-neutral-800">
            <div className="relative w-96">
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type="text"
                    placeholder="Search for tracks, artists, albums"
                    className="w-full bg-neutral-900 text-sm px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />

                {results.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl z-50">
                        {results.map((track) => (
                            <div
                                key={track.id}
                                onClick={() => {
                                    navigate(`/discover/music/${track.id}`);
                                    setValue("");
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 cursor-pointer transition"
                            >
                                <img
                                    src={track.cover_url}
                                    alt={track.title}
                                    className="w-9 h-9 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                        {track.title}
                                    </div>
                                    <div className="text-xs text-neutral-400 truncate">
                                        {track.artist}
                                    </div>
                                </div>
                                {currentTrack?.id === track.id && (
                                    <span className="text-emerald-400 text-xs shrink-0">
                                        playing{" "}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {value.trim().length > 0 &&
                    results.length === 0 &&
                    !isLoading && (
                        <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-400">
                            No results found.{" "}
                        </div>
                    )}
            </div>
        </header>
    );
};

export default Topbar;
