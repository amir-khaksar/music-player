import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useLikeSong = () => {
    return useMutation({
        mutationKey: ["like-song"],
        mutationFn: async (songId) => {
            const res = await api.post(`songs/${songId}/like`);
            return res.data;
        },
    });
};
