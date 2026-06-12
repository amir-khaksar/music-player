const PlaylistSidebarLoading = () => {
    return (
        <div className="flex flex-col gap-2 px-2">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl animate-pulse"
                >
                    <div className="w-8 h-8 rounded-lg bg-white/6 shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                        <div className="h-2.5 bg-white/6 rounded-full w-3/4" />
                        <div className="h-2 bg-white/4 rounded-full w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlaylistSidebarLoading;
