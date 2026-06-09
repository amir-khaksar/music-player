import { useMutation } from "@tanstack/react-query";
import { signOut } from "../services/auth";

export const useLogout = () => {
    return useMutation({
        mutationFn: signOut,
    });
};
