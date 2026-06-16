import { NavLink } from "react-router-dom";
import { useGetPlaylists } from "../pages/playLists/hooks/useGetPlaylists";
import PlaylistSidebarLoading from "../components/PlaylistSidebarLoading";
import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
interface NavItem {
    id: string;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { id: "home", label: "Home", href: "music" },
    { id: "your likes", label: "Your Likes", href: "liked" },
    { id: "playlist", label: "Your PlayLists", href: "playlists" },
];

const Sidebar = ({ isOpen, onClose }: Props) => {
    const { data: playlists, isLoading } = useGetPlaylists();
    const safePlaylist = playlists ?? [];

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}
            <aside
                onClick={onClose}
                className={`fixed top-0 left-0 z-70 h-screen w-64 bg-neutral-900 p-6 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0`}
            >
                <div className="flex items-center gap-x-12">
                    <div className="text-2xl font-bold mb-8 bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        SoundSpace
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center md:hidden text-white -mt-5.5"
                    >
                        <X size={18} color="#737373" />
                    </button>
                </div>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.href}
                            className={({ isActive }) =>
                                `block w-full text-left px-4 py-2 mb-2 rounded-xl transition ${isActive ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="mt-8 flex-1 overflow-y-auto">
                    <div className="text-sm uppercase text-neutral-500 mb-3">
                        Playlists
                    </div>
                    <div className="space-y-2">
                        {isLoading ? (
                            <PlaylistSidebarLoading />
                        ) : (
                            safePlaylist.map((p: any) => (
                                <NavLink
                                    to={`playlists/${p.id}`}
                                    key={p.id}
                                    className="text-neutral-400 block hover:text-white cursor-pointer transition"
                                >
                                    {p.name}
                                </NavLink>
                            ))
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
