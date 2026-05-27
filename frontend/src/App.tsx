import { tracks, albums, artists } from "./data/mockData";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import PlayerBar from "./layout/PlayerBar";
import SearchGrid from "./components/SearchGrid";

const App = () => {
    return (
        <div className="flex h-screen bg-neutral-950 text-neutral-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Topbar />
                <main className="overflow-y-auto p-6 pb-28">
                    <SearchGrid
                        tracks={tracks}
                        albums={albums}
                        artists={artists}
                    />
                </main>
            </div>
            <PlayerBar track={tracks[0]} />
        </div>
    );
};

export default App;
