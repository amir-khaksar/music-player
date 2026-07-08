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

        onMutate: async (songId) => {
            await queryClient.cancelQueries({
                queryKey: ["liked-songs"],
            });

            const previousLikedSongs = queryClient.getQueryData<any[]>([
                "liked-songs",
            ]);

            queryClient.setQueryData<any[]>(["liked-songs"], (old = []) => [
                ...old,
                {
                    song_id: songId,
                },
            ]);

            return { previousLikedSongs };
        },

        onError: (_, __, context) => {
            queryClient.setQueryData(
                ["liked-songs"],
                context?.previousLikedSongs,
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["liked-songs"],
            });
        },
    });
};
