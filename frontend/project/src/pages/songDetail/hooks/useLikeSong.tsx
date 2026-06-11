import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useLikeSong = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["like-song"],
        mutationFn: async (songId: number) => {
            const { data } = await api.post(`songs/${songId}/like`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["liked-songs"],
            });
        },
    });
};
