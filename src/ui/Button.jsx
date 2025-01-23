export default function Button({ onClick, className, children, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled} className={`flex items-center gap-2 rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 ${className}`}>
            {children}
        </button>
    );
}
