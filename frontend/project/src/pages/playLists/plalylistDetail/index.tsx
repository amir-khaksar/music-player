import Loading from "../../../components/Loading";
import SearchGrid from "../../../components/SearchGrid";
import { useGetSongsWithPlaylist } from "./hooks/useGetSongswithPlaylist";
import { useParams } from "react-router-dom";

export default function PlayListDatail() {
    const { id } = useParams();
    const { data: tracks, isLoading } = useGetSongsWithPlaylist(id!);

    const songs = tracks?.map((item: any) => item.songs) ?? [];

    if (isLoading) return <Loading />;

    return <SearchGrid tracks={songs} />;
}
