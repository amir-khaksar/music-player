import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useDeleteSong = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/songs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-songs"] });
        },
    });
};
