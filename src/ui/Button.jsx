const variants = {
    auth: `w-full rounded-md bg-gray-800 px-4 py-3 text-white`,
    small: `flex items-center gap-2 rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600`,
    tiny: `flex items-center gap-2 text-sm rounded bg-blue-500 text-white px-2 py-1 hover:bg-blue-600`,
};

export default function Button({
    onClick,
    className,
    children,
    disabled,
    variant = 'small',
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        >
            {children}
        </button>
    );
}
