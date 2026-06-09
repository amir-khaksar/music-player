import { tracks, albums } from "../../data/mockData";
import Sidebar from "./../../layout/SideBar";
import Topbar from "../../layout/TopBar";
import PlayerBar from "../../layout/PlayerBar";
import SearchGrid from "./../../components/SearchGrid";

export default function index() {
    return (
        <div className="flex h-screen bg-neutral-950 text-neutral-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Topbar />
                <main className="overflow-y-auto p-6 pb-32">
                    <SearchGrid tracks={tracks} albums={albums} />
                </main>
            </div>
            <PlayerBar track={tracks[0]} />
        </div>
    );
}
