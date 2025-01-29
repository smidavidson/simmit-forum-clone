import { createContext } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function TableOperations({ children, className }) {
    return (
        <div
            className={`flex gap-3 rounded-md border bg-white px-3 py-1 ${className}`}
        >
            {children}
        </div>
    );
}

function OperationsItem({
    filterField,
    options,
    className,
    children,
    defaultValue = null,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options.at(0).value;

    function handleClick(value) {
        console.log('click: ', value);

        // if (value === 'none') {
        // searchParams.delete(filterField);
        // } else {
        searchParams.set(filterField, value);
        // }

        if (searchParams.get('page')) {
            searchParams.set('page', 1);
        }

        setSearchParams(searchParams);
    }

    return (
        <div className={` ${className}`}>
            <label>{children}</label>
            <select
                className={`rounded-md border`}
                value={currentFilter}
                onChange={(e) => {
                    handleClick(e.target.value);
                }}
            >
                {defaultValue && (
                    <option
                        key='none'
                        value='none'
                        disabled={currentFilter === 'none'}
                    >
                        {'none'}
                    </option>
                )}
                {options.map((option) => {
                    return (
                        <option
                            key={option.id}
                            value={option.name}
                            disabled={currentFilter === option.name}
                            className={
                                currentFilter === option.name ? 'font-bold' : ''
                            }
                        >
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

TableOperations.Item = OperationsItem;
