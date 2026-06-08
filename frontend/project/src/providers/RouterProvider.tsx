import {
    createBrowserRouter,
    Navigate,
    RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import Auth from "../pages/Auth/index";
import MusicPlayer from "../pages/music-player/index";
import NotFound from "../pages/not-found";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth" replace />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "home",
        element: <MusicPlayer />,
    },
    {
        path: "/auth",
        element: <Auth />,
    },
]);

const RouterProvider: React.FC = () => {
    return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
