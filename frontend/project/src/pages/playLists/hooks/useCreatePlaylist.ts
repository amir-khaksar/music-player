import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create-playlist"],
        mutationFn: async ({ name }: { name: string }) => {
            const res = await api.post("/playlists", { name });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-playlists"] });
        },
        onError: (err) => {
            console.log(err);
        },
    });
};
