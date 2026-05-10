import type { Artist } from "../types/media";

interface Props {
    artist: Artist;
}

const ArtistCard = ({ artist }: Props) => {
    return (
        <div className="group bg-neutral-900 p-4 rounded-2xl hover:bg-neutral-800 transition text-center shadow-lg">
            <img
                src={artist.image}
                alt={artist.name}
                className="rounded-full mb-4"
            />
            <div className="font-semibold">{artist.name}</div>
        </div>
    );
};

export default ArtistCard;
