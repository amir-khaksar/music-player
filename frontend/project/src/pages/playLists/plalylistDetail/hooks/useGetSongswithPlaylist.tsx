import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../lib/axios";

export const useGetSongsWithPlaylist = (playlistId: string) => {
    return useQuery({
        queryKey: ["get-songs-with-playlist", playlistId],
        queryFn: async () => {
            const res = await api.get(`playlists/${playlistId}/songs`);
            return res.data;
        },
        enabled: !!playlistId,
    });
};
