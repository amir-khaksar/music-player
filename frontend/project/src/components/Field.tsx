import { forwardRef, type InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
    ({ label, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-xs">{label}</label>

                <input
                    ref={ref}
                    {...props}
                    className="bg-white/5 backdrop-blur-sm border border-white/8 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 rounded-xl px-4 py-2.5 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-200"
                />
            </div>
        );
    },
);

Field.displayName = "Field";

export default Field;
