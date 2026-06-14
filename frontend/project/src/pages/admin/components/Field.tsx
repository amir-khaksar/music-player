export function Field({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    type?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-white/40 text-xs">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-white/5 border border-white/8 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 rounded-xl px-4 py-2.5 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-200"
            />
        </div>
    );
}
