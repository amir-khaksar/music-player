import { useGetSongs } from "../home/hooks/useGetSongs";
import Loading from "../../components/Loading";
import SearchGrid from "../../components/SearchGrid";

export default function SongsPage() {
    const { data, isLoading } = useGetSongs();

    if (isLoading) return <Loading />;

    return <SearchGrid tracks={data.songs} />;
}
