import type { Track, Album, Artist } from "../types/media";
import TrackCard from "./TrackCard";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";

interface Props {
    tracks: Track[];
    albums: Album[];
    artists: Artist[];
}

const SearchGrid = ({ tracks, albums, artists }: Props) => {
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

            <section>
                <h2 className="text-xl font-bold mb-6">Artists</h2>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {artists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SearchGrid;
