import ReactQueryProvider from "./providers/ReactQueryProvider";
import RouterProvider from "./providers/RouterProvider";

const App = () => {
    return (
        <ReactQueryProvider>
            <RouterProvider />
        </ReactQueryProvider>
    );
};

export default App;
