import { useForm } from "react-hook-form";
import AuthButton from "../../../components/AuthButton";
import Field from "../../../components/Field";
import { useRegister } from "../hooks/useRegister";

type RegisterFormData = {
    email: string;
    password: string;
};

export default function RegisterForm() {
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="mb-1">
                <h2 className="text-white/90 text-lg font-medium">
                    Create an account
                </h2>

                <p className="text-white/35 text-sm mt-1">
                    Get started for free
                </p>
            </div>

            <Field
                label="Email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                    required: "Email is required",
                })}
            />

            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <Field
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                    },
                })}
            />

            {errors.password && (
                <p className="text-red-500 text-sm">
                    {errors.password.message}
                </p>
            )}

            <AuthButton
                label="register"
                disabled={registerMutation.isPending}
            />
        </form>
    );
}
