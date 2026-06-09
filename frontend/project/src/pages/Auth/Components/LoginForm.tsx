import AuthButton from "../../../components/AuthButton";
import Field from "../../../components/Field";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin,";

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
        loginMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="mb-1">
                <h2 className="text-white/90 text-lg font-medium">
                    welcome back
                </h2>
                <p className="text-white/35 text-sm mt-1">
                    Log in to your account.
                </p>
            </div>

            <Field
                label="Email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
            />

            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <Field
                label="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
            />

            {errors.password && (
                <p className="text-red-500 text-sm">
                    {errors.password.message}
                </p>
            )}

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="remember"
                    className="accent-emerald-500"
                />
                <label htmlFor="remember" className="text-white/35 text-xs">
                    Remember me.
                </label>
            </div>

            <AuthButton label="login" disabled={loginMutation.isPending} />
        </form>
    );
}
