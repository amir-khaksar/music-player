export default function AuthButton({ label }: { label: string }) {
    return (
        <button
            type="submit"
            className="w-full cursor-pointer mt-1 py-3 bg-emerald-500/85 hover:bg-emerald-600/90 active:scale-[0.98] backdrop-blur-sm border border-emerald-400/40 rounded-xl text-white text-sm font-medium transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_20px_rgba(16,185,129,0.2)]"
        >
            {label}
        </button>
    );
}
