import { useState } from "react";
import { useGetSongs } from "../home/hooks/useGetSongs";
import Loading from "../../components/Loading";
import SearchGrid from "../../components/SearchGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SongsPage() {
    const [page, setPage] = useState(1);
    const limit = 20;

    const { data, isLoading } = useGetSongs(page, limit);

    if (isLoading) return <Loading />;

    const totalPages = data?.pagination?.totalPages ?? 1;

    return (
        <div>
            <SearchGrid tracks={data?.songs} />

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-10 mb-6">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white/60 transition-all duration-200"
                >
                    <ChevronLeft size={16} />
                </button>

                <span className="text-white/40 text-sm">
                    page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white/60 transition-all duration-200"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
