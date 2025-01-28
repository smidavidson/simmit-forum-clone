const variants = {
    inline: `flex items-center text-xs text-gray-50 rounded-md border px-1 py-0.5`,
};

export default function Flair({
    variant = 'inline',
    className,
    children,
    color,
}) {
    return (
        <span
            className={`${variants[variant]} ${className}`}
            style={{ backgroundColor: color }}
        >
            {children}
        </span>
    );
}
