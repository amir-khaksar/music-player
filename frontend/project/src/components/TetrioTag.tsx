import taglogo from "../../src/assets/taglogo.svg";

interface TetrioTagProps {
    className?: string;
    lightMode?: boolean;
}

const TetrioTag = ({ className, lightMode }: TetrioTagProps) => {
    return (
        <a
            href="https://tetrioteam.ir/"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative isolate inline-flex items-center justify-center gap-1 overflow-hidden rounded-full transition-all duration-300 hover:shadow-[0_0_18px_rgba(197,244,103,0.15)] md:gap-2 md:border md:border-[#34433F] ${!lightMode ? "md:bg-[#C5F467]/10" : "md:bg-[#3A4A18]/10"} md:px-2 md:py-1 md:shadow-[0_0_12px_rgba(197,244,103,0.06)] ${className || ""}`}
        >
            {/* Animated Border */}
            <span className="pointer-events-none absolute inset-0 -z-10 origin-bottom scale-x-0 rounded-full border-t border-[#C5F467] transition-transform duration-500 ease-out group-hover:scale-x-100" />

            {/* Glass Shine */}
            <span className="pointer-events-none absolute -inset-y-full right-[-40%] z-10 w-1/3 rotate-20 bg-linear-to-l from-transparent via-white/30 to-transparent blur-[2px] transition-all duration-850 ease-in-out group-hover:right-[120%]" />

            <img
                src={taglogo}
                alt="TETRIO"
                className="relative z-20 h-3.75 w-3.75 object-contain md:h-6 md:w-6 lg:h-7.5 lg:w-7.5"
            />

            <span
                className={`font-body-fa relative z-20 px-1 text-[11px] whitespace-nowrap ${!lightMode ? "text-white" : "text-[#0B0D0C]"} md:text-[12px] lg:text-sm`}
            >
                Developed by
                <span
                    className={`font-title-fa font-extrabold ${!lightMode ? "text-[#C5F467]" : "text-[#3A4A18]"}`}
                >
                    {" "}
                    Tetrio
                </span>
            </span>
        </a>
    );
};

export default TetrioTag;
