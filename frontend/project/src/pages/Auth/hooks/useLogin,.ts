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
    });
};
