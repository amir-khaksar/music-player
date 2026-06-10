import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useGetSong = (id: string) => {
    return useQuery({
        queryKey: ["song", id],
        queryFn: async () => {
            const res = await api.get(`/songs/${id}`);
            return res.data;
        },
    });
};
