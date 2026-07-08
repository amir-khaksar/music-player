import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
    ({ label, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === "password";

        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-xs">{label}</label>

                <div className="relative">
                    <input
                        ref={ref}
                        type={
                            isPassword
                                ? showPassword
                                    ? "text"
                                    : "password"
                                : type
                        }
                        {...props}
                        className={`bg-white/5 backdrop-blur-sm border border-white/8 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 rounded-xl px-4 py-2.5 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-200 w-full ${
                            isPassword ? "pr-12" : ""
                        }`}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff
                                    size={16}
                                    className="text-emerald-500"
                                />
                            ) : (
                                <Eye size={16} className="text-emerald-500" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        );
    },
);

Field.displayName = "Field";

export default Field;
