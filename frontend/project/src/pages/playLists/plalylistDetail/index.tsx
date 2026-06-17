import Loading from "../../../components/Loading";
import SearchGrid from "../../../components/SearchGrid";
import { useGetSongsWithPlaylist } from "./hooks/useGetSongswithPlaylist";
import { useRemoveSongFromPlaylist } from "./hooks/useRemoveSongFromPlalylist";
import { useParams } from "react-router-dom";

export default function PlayListDatail() {
    const { id } = useParams();
    const { data: tracks, isLoading } = useGetSongsWithPlaylist(id!);
    const { mutate: removeSong } = useRemoveSongFromPlaylist();

    const songs = tracks?.map((item: any) => item.songs) ?? [];

    if (isLoading) return <Loading />;

    const handleRemove = (trackId: string) => {
        removeSong({ playlistId: id!, songId: trackId });
    };

    return <SearchGrid tracks={songs} onRemove={handleRemove} />;
}
