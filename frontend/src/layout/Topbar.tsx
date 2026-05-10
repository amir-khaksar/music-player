const Topbar = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-neutral-950/70 backdrop-blur-xl border-b border-neutral-800">
            <input
                type="text"
                placeholder="Search for tracks, artists, albums"
                className="w-96 bg-neutral-900 text-sm px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-emerald-600" />
                {/* <span className="text-sm font-medium">Amir</span> */}
                <button
                    onClick={() =>
                        (window.location.href =
                            "https://relivable-karl-myological.ngrok-free.dev/auth/login")
                    }
                >
                    Login with Spotify
                </button>
            </div>
        </header>
    );
};

export default Topbar;
