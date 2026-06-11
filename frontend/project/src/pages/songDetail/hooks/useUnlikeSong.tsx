import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useUnlikeSong = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["unlike-song"],
        mutationFn: async (songId) => {
            const { data } = await api.delete(`songs/${songId}/like`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["liked-songs"],
            });
        },
    });
};
