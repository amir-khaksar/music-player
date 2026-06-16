import type { Track } from "../types/media";
import TrackCard from "./TrackCard";
import { useLocation } from "react-router-dom";

interface Props {
    tracks: Track[];
}

const SearchGrid = ({ tracks }: Props) => {
    const location = useLocation();
    const safeTracks = tracks ?? [];

    return (
        <div className="space-y-12">
            <section>
                <h2 className="text-xl font-bold mb-6">
                    {location.pathname === "/discover/liked"
                        ? "Liked Tracks"
                        : "Tracks"}
                </h2>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {safeTracks.map((track) => (
                        <TrackCard key={track.id} track={track} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SearchGrid;
