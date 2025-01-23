export default function SubmissionContentBox({
    id,
    value,
    onChange,
    placeholder,
    rows = 4,
    className = '',
}) {
    // Later use Redux to implement basic text editing features (bolding, italicize, strikethrough, etc)

    return (
        <div>
            <div>Bold Italicize Strikethrough Preview</div>
            <textarea
                className={`w-full border p-2 ${className}`}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
            ></textarea>
        </div>
    );
}
