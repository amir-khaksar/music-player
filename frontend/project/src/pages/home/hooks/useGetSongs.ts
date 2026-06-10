import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useGetSongs = () => {
    return useQuery({
        queryKey: ["get-songs"],
        queryFn: async () => {
            const res = await api.get("/songs");
            return res.data;
        },
    });
};
