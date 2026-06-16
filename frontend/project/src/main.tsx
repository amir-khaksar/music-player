import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PlayerProvider } from "./contexts/playerContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <PlayerProvider>
            <App />
        </PlayerProvider>
    </AuthProvider>,
);
