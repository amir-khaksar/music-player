import { useMutation } from "@tanstack/react-query";
import { signUp } from "./../services/auth";

export const useRegister = () => {
    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            return signUp(email, password);
        },
    });
};
