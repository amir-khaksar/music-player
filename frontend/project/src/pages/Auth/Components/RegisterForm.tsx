import AuthButton from "../../../components/AuthButton";
import Field from "../../../components/Field";

export default function RegisterForm() {
    return (
        <div className="flex flex-col gap-4">
            <div className="mb-1">
                <h2 className="text-white/90 text-lg font-medium">
                    Create an account
                </h2>
                <p className="text-white/35 text-sm mt-1">
                    Get started for free
                </p>
            </div>

            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="password" type="password" placeholder="••••••••" />

            <AuthButton label="register" />
        </div>
    );
}
