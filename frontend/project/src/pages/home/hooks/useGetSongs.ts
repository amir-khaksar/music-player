import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useGetSongs = (page: number = 1, limit: number = 20) => {
    return useQuery({
        queryKey: ["get-songs", page, limit],
        queryFn: async () => {
            const res = await api.get(`/songs?page=${page}&limit=${limit}`);
            return res.data;
        },
    });
};
