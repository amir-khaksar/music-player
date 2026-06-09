type AlertType = "success" | "error";

interface ModalProps {
    type: AlertType;
    title: string;
    message: string;
    onClose: () => void;
}

export default function Modal({ type, title, message, onClose }: ModalProps) {
    const isSuccess = type === "success";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Glow */}
                <div
                    className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
                        isSuccess ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}
                />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/40 hover:text-white/70 transition-all duration-200"
                >
                    <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        viewBox="0 0 24 24"
                    >
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Icon */}
                <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 border ${
                        isSuccess
                            ? "bg-emerald-500/10 border-emerald-500/25"
                            : "bg-red-500/10 border-red-500/25"
                    }`}
                >
                    {isSuccess ? (
                        <svg
                            width="26"
                            height="26"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    ) : (
                        <svg
                            width="26"
                            height="26"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4M12 16h.01" />
                        </svg>
                    )}
                </div>

                {/* Text */}
                <div className="text-center mb-7">
                    <h3 className="text-white/90 text-lg font-medium mb-2">
                        {title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Divider */}
                <div
                    className={`w-10 h-px mx-auto mb-7 ${
                        isSuccess ? "bg-emerald-500/30" : "bg-red-500/30"
                    }`}
                />

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-xl text-white/50 hover:text-white/75 text-sm font-medium transition-all duration-200"
                    >
                        close
                    </button>
                    <button
                        onClick={onClose}
                        className={`flex-1 py-2.5 backdrop-blur-sm border rounded-xl text-white text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                            isSuccess
                                ? "bg-emerald-500/85 hover:bg-emerald-600/90 border-emerald-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_20px_rgba(16,185,129,0.2)]"
                                : "bg-red-500/80 hover:bg-red-600/90 border-red-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_20px_rgba(239,68,68,0.2)]"
                        }`}
                    >
                        {isSuccess ? "great!" : "try again"}
                    </button>
                </div>
            </div>
        </div>
    );
}
