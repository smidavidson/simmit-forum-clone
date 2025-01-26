import { forwardRef } from "react";

const SubmissionContentBox = forwardRef(({id, placeholder, rows = 4, className = '', ...props }, ref) => {
    return (
        <div>
            <div>Bold Italicize Strikethrough Preview</div>
            <textarea
                {...props}
                ref={ref}
                className={`w-full border p-2 ${className}`}
                id={id}
                placeholder={placeholder}
                rows={rows}
            ></textarea>
        </div>
    );
});

SubmissionContentBox.displayName = 'SubmissionContentBox';

export default SubmissionContentBox;