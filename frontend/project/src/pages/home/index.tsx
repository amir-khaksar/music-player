import Sidebar from "./../../layout/SideBar";
import Topbar from "../../layout/TopBar";
import PlayerBar from "../../layout/PlayerBar";
import SearchGrid from "./../../components/SearchGrid";
import { useGetSongs } from "./hooks/useGetSongs";
import Loading from "../../components/Loading";

export default function index() {
    const { data: tracks, isLoading } = useGetSongs();

    return (
        <div className="flex h-screen bg-neutral-950 text-neutral-100">
            {isLoading ? (
                <div className="mx-auto">
                    <Loading />
                </div>
            ) : (
                <>
                    <Sidebar />
                    <div className="flex flex-1 flex-col">
                        <Topbar />
                        <main className="overflow-y-auto p-6 pb-32">
                            <SearchGrid tracks={tracks.songs} />
                        </main>
                    </div>
                    <PlayerBar />
                </>
            )}
        </div>
    );
}
