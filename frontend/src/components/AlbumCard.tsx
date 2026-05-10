import type { Album } from "../types/media";

interface Props {
    album: Album;
}

const AlbumCard = ({ album }: Props) => {
    return (
        <div className="group bg-neutral-900 p-4 rounded-2xl hover:bg-neutral-800 transition shadow-lg">
            <img
                src={album.image}
                alt={album.title}
                className="rounded-xl mb-4"
            />
            <div className="font-semibold">{album.title}</div>
            <div className="text-sm text-neutral-400">{album.artist}</div>
        </div>
    );
};

export default AlbumCard;
