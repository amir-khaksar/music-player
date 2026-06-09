interface Props {
    value: number;
    onChange?: (value: number) => void;
}

const ProgressBar = ({ value, onChange }: Props) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!onChange) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newValue = (clickX / rect.width) * 100;
        onChange(Math.max(0, Math.min(100, newValue)));
    };

    return (
        <div
            className="w-full h-1 bg-neutral-700 rounded-full cursor-pointer"
            onClick={handleClick}
        >
            <div
                className="h-1 bg-emerald-500 rounded-full transition-all"
                style={{ width: `${value}%` }}
            />
        </div>
    );
};

export default ProgressBar;
