import { forwardRef } from 'react';

const SubmissionContentBox = forwardRef(
    (
        { id, placeholder, rows = 4, className = '', disabled, ...props },
        ref,
    ) => {
        return (
            <div>
                <div></div>
                <textarea
                    {...props}
                    ref={ref}
                    className={`w-full border p-2 ${className}`}
                    id={id}
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={rows}
                ></textarea>
            </div>
        );
    },
);

SubmissionContentBox.displayName = 'SubmissionContentBox';

export default SubmissionContentBox;
