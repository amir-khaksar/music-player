const Topbar = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-neutral-950/70 backdrop-blur-xl border-b border-neutral-800">
            <input
                type="text"
                placeholder="Search for tracks, artists, albums"
                className="w-96 bg-neutral-900 text-sm px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
        </header>
    );
};

export default Topbar;
