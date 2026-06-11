import {
    createBrowserRouter,
    Navigate,
    RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import Auth from "../pages/Auth/index";
import MusicPlayer from "../pages/home/index";
import NotFound from "../pages/not-found";
import SongDetail from "../pages/songDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth" replace />,
    },
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "discover",
        element: <MusicPlayer />,
    },
    {
        path: "discover/music/:id",
        element: <SongDetail />,
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
