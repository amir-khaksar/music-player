import Sidebar from "./../../layout/SideBar";
import Topbar from "../../layout/TopBar";
import PlayerBar from "../../layout/PlayerBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function index() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-neutral-950 text-neutral-100">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <div className="flex flex-1 flex-col">
                <Topbar
                    isOpen={isSidebarOpen}
                    onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
                />
                <main className="overflow-y-auto p-6 pb-32">
                    <Outlet />
                </main>
            </div>
            <PlayerBar />
        </div>
    );
}
