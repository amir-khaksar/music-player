import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/auth";
import { useModalStore } from "../../../store/useModalStore";

export const useLogin = () => {
    const { showModal } = useModalStore();

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
            showModal({
                type: "success",
                title: "Login successful",
                message: `Welcome back, ${data.user?.email}!`,
            });
        },
        onError: () => {
            showModal({
                type: "error",
                title: "Login failed",
                message: "Please check your credentials and try again.",
            });
        },
    });
};
