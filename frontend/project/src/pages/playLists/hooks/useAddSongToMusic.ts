import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useAddSongToPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            playlistId,
            songId,
        }: {
            playlistId: string;
            songId: string;
        }) => {
            const res = await api.post(`/playlists/${playlistId}/songs`, {
                songId,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-playlists"] });
        },
    });
};
