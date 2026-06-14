import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useCreateSong = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (song: {
            title: string;
            artist: string;
            audio_url: string;
            cover_url: string;
            duration: number;
        }) => {
            const res = await api.post("/songs", song);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-songs"] });
        },
    });
};
