import AuthButton from "../../../components/AuthButton";
import Field from "../../../components/Field";

export default function LoginForm() {
    return (
        <div className="flex flex-col gap-4">
            <div className="mb-1">
                <h2 className="text-white/90 text-lg font-medium">
                    welcome back
                </h2>
                <p className="text-white/35 text-sm mt-1">
                    Log in to your account.
                </p>
            </div>

            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="password" type="password" placeholder="••••••••" />

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

            <AuthButton label="login" />
        </div>
    );
}
