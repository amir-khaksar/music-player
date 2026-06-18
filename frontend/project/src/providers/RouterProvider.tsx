import {
    createBrowserRouter,
    Navigate,
    RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import Auth from "../pages/Auth/index";
import MusicPlayer from "../pages/home/index";
import NotFound from "../pages/not-found";
import SongDetail from "../pages/songDetail";
import SongsPage from "../pages/songs";
import LikedSongsPage from "../pages/likedSongs";
import PlayLists from "../pages/playLists";
import PlaylistDetail from "../pages/playLists/plalylistDetail/index";
import AdminPage from "../pages/admin/index";
import UploadPage from "../pages/admin/upload";
import {
    RedirectIfAuthenticated,
    RequireAdmin,
    RequireAuth,
} from "./routes/guards";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/discover/music" replace />,
    },
    {
        path: "/auth",
        element: (
            <RedirectIfAuthenticated>
                <Auth />
            </RedirectIfAuthenticated>
        ),
    },
    {
        element: <RequireAuth />,
        children: [
            {
                path: "discover",
                element: <MusicPlayer />,
                children: [
                    {
                        path: "music",
                        element: <SongsPage />,
                    },
                    {
                        path: "liked",
                        element: <LikedSongsPage />,
                    },
                    {
                        path: "playlists",
                        element: <PlayLists />,
                    },
                    {
                        path: "playlists/:id",
                        element: <PlaylistDetail />,
                    },
                ],
            },
        ],
    },
    {
        path: "discover/music/:id",
        element: <SongDetail />,
    },
    {
        element: <RequireAdmin />,
        children: [
            {
                path: "/admin",
                element: <AdminPage />,
            },
            {
                path: "/admin/upload",
                element: <UploadPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const RouterProvider: React.FC = () => {
    return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
