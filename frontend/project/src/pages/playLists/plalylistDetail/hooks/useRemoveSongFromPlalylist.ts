import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../lib/axios";

export const useRemoveSongFromPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            playlistId,
            songId,
        }: {
            playlistId: string;
            songId: string;
        }) => {
            const res = await api.delete(
                `/playlists/${playlistId}/songs/${songId}`,
            );
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["get-songs-with-playlist", variables.playlistId],
            });
        },
    });
};
