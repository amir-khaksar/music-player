import {
    createBrowserRouter,
    RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import Register from "../pages/Register/index";
import MusicPlayer from "../pages/music-player/index";

const router = createBrowserRouter([
    {
        path: "*",
        element: "hello",
    },
    {
        path: "music-player",
        element: <MusicPlayer />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

const RouterProvider: React.FC = () => {
    return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
