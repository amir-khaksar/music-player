import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/auth";

export const useLogin = () => {
    return useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => signIn(email, password),
        onSuccess: (data) => {
            console.log("Login successful:", data);
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });
};
