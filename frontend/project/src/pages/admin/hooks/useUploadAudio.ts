import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export const useUploadAudio = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("audio", file);
            const res = await api.post("/songs/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data.url; // audio_url
        },
    });
};
