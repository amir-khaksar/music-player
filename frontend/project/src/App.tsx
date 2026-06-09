import ReactQueryProvider from "./providers/ReactQueryProvider";
import RouterProvider from "./providers/RouterProvider";
import Modal from "./components/AlertModal";
import { useModalStore } from "./store/useModalStore";

const App = () => {
    const { modal, closeModal } = useModalStore();

    return (
        <ReactQueryProvider>
            <RouterProvider />
            {modal && <Modal {...modal} onClose={closeModal} />}
        </ReactQueryProvider>
    );
};

export default App;
