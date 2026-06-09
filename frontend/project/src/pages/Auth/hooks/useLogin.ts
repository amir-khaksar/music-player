import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/auth";
import { useModalStore } from "../../../store/useModalStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
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
            showModal({
                type: "success",
                title: "Login successful",
                message: `Welcome back, ${data.user?.email}!`,
            });
            setTimeout(() => {
                navigate("/home");
            }, 1500);
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
