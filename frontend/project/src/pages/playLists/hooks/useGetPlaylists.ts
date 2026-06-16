import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useGetPlaylists = () => {
    return useQuery({
        queryKey: ["get-playlists"],
        queryFn: async () => {
            const { data } = await api.get("/playlists");
            return data;
        },
        retry: false,
    });
};
