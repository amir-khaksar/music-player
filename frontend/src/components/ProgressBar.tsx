interface Props {
    value: number;
}

const ProgressBar = ({ value }: Props) => {
    return (
        <div className="w-full h-1 bg-neutral-700 rounded-full">
            <div
                className="h-1 bg-emerald-500 rounded-full transition-all"
                style={{ width: `${value}%` }}
            />
        </div>
    );
};

export default ProgressBar;
