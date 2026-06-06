import { useState } from "react";

interface NavItem {
    id: string;
    label: string;
}

const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "search", label: "Search" },
    { id: "library", label: "Your Library" },
];

const playlists: string[] = [
    "Deep Focus",
    "Chill Nights",
    "Workout Mix",
    "Synthwave Drive",
];

const Sidebar = () => {
    const [active, setActive] = useState<string>("home");

    return (
        <aside className="w-64 bg-neutral-900 p-6 flex flex-col">
            <div className="text-2xl font-bold mb-8 bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                SoundSpace
            </div>
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={`w-full text-left px-4 py-2 rounded-xl transition ${
                            active === item.id
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="mt-8 flex-1 overflow-y-auto">
                <div className="text-sm uppercase text-neutral-500 mb-3">
                    Playlists
                </div>
                <div className="space-y-2">
                    {playlists.map((p) => (
                        <div
                            key={p}
                            className="text-neutral-400 hover:text-white cursor-pointer transition"
                        >
                            {p}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
