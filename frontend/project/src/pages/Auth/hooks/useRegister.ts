import { useMutation } from "@tanstack/react-query";
import { signUp } from "./../services/auth";
import { useModalStore } from "../../../store/useModalStore";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate();
    const { showModal } = useModalStore();

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
        onSuccess: (data) => {
            showModal({
                type: "success",
                title: "Registration successful",
                message: `Welcome, ${data.user?.email}! Your account has been created.`,
            });
            navigate("/home");
        },
        onError: (error) => {
            console.error("Registration failed:", error);
            showModal({
                type: "error",
                title: "Registration failed",
                message:
                    "An error occurred during registration. Please try again.",
            });
        },
    });
};
