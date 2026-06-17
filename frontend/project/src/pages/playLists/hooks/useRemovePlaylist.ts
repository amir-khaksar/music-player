import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useRemovePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["remove-playlist"],
        mutationFn: async (playlistId: string) => {
            const res = await api.delete(`/playlists/${playlistId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-playlists"] });
        },
    });
};
