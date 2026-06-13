import { useNavigate } from "react-router-dom";
import { useUser } from "../pages/Auth/hooks/useUser";
import { useLogout } from "../pages/Auth/hooks/useLogout";
import { getInitials } from "../helper/getInitials";
import { Heart, LogOut, ListMusic } from "lucide-react";
import { useModalStore } from "../store/useModalStore";

const ProfileDropdown = ({ onClose }: { onClose: () => void }) => {
    const navigate = useNavigate();
    const { data: user } = useUser();
    const { mutate: logout } = useLogout();

    const { showModal } = useModalStore();

    const handleNav = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleSignOut = () => {
        logout(undefined, {
            onSuccess: () => {
                showModal({
                    type: "success",
                    title: "Logged out successfully",
                    message: "You have been signed out of your account.",
                });
                navigate("/auth");
                onClose();
            },
            onError: () => {
                showModal({
                    type: "error",
                    title: "Logout failed",
                    message:
                        "Something went wrong while signing you out. Please try again.",
                });
            },
        });
    };

    const menuItems = [
        {
            icon: (
                <Heart
                    size={14}
                    className="text-emerald-500"
                    fill="oklch(69.6% 0.17 162.48)"
                />
            ),
            label: "Liked Songs",
            path: "/discover/liked",
        },
        {
            icon: (
                <ListMusic
                    size={14}
                    className="text-emerald-500"
                    fill="oklch(69.6% 0.17 162.48)"
                />
            ),
            label: "PlayLists",
            path: "/discover/playlists",
        },
    ];

    return (
        <div className="absolute right-0 top-full mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-medium text-white shrink-0">
                    {user?.email ? getInitials(user.email) : "?"}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                        {user?.email ?? "User"}
                    </p>
                </div>
            </div>

            <div className="py-1">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => handleNav(item.path)}
                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition text-left"
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="border-t border-neutral-800 py-1">
                <button
                    onClick={handleSignOut}
                    className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-neutral-800 hover:text-red-300 transition text-left"
                >
                    <span>
                        <LogOut size={14} />
                    </span>
                    Log out
                </button>
            </div>
        </div>
    );
};

export default ProfileDropdown;
