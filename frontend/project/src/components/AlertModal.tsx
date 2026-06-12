import { AlertCircle, CheckCircle, X } from "lucide-react";

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

            <div
                className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
                        isSuccess ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}
                />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/40 hover:text-white/70 transition-all duration-200"
                >
                    <X size={14} />
                </button>

                <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 border ${
                        isSuccess
                            ? "bg-emerald-500/10 border-emerald-500/25"
                            : "bg-red-500/10 border-red-500/25"
                    }`}
                >
                    {isSuccess ? (
                        <CheckCircle className="text-emerald-500" />
                    ) : (
                        <AlertCircle className="text-red-500" />
                    )}
                </div>

                <div className="text-center mb-7">
                    <h3 className="text-white/90 text-lg font-medium mb-2">
                        {title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>

                <div
                    className={`w-10 h-px mx-auto mb-7 ${
                        isSuccess ? "bg-emerald-500/30" : "bg-red-500/30"
                    }`}
                />

                <button
                    onClick={onClose}
                    className="w-full flex-1 cursor-pointer py-2.5 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-xl text-white/50 hover:text-white/75 text-sm font-medium transition-all duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
