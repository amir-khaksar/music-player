import type { Track, Album } from "../types/media";
import TrackCard from "./TrackCard";
import AlbumCard from "./AlbumCard";

interface Props {
    tracks: Track[];
    albums: Album[];
}

const SearchGrid = ({ tracks, albums }: Props) => {
    return (
        <div className="space-y-12">
            <section>
                <h2 className="text-xl font-bold mb-6">Tracks</h2>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {tracks.map((track) => (
                        <TrackCard key={track.id} track={track} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-6">Albums</h2>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {albums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SearchGrid;
