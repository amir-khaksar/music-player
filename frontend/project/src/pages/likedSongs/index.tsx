import { useGetLikedSongs } from "../songDetail/hooks/useGetLikedSongs";
import Loading from "../../components/Loading";
import SearchGrid from "../../components/SearchGrid";

export default function LikedSongsPage() {
    const { data: tracks, isLoading } = useGetLikedSongs();

    const songs = tracks?.map((item: any) => item.songs) ?? [];

    if (isLoading) return <Loading />;

    return <SearchGrid tracks={songs} />;
}
