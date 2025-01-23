export default function Button({ onClick, className, children }) {
    return (
        <button onClick={onClick} className={`flex items-center gap-2 rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 ${className}`}>
            {children}
        </button>
    );
}
