import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useGetLikedSongs = () => {
    return useQuery({
        queryKey: ["liked-songs"],
        queryFn: async () => {
            const res = await api.get("/songs/likes");
            return res.data;
        },
    });
};
