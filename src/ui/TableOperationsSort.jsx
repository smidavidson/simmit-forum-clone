import { useSearchParams } from 'react-router-dom';

export default function TableOperations({ filterField, options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options.at(0).value;

    function handleClick(value) {
        searchParams.set(filterField, value);
        if (searchParams.get('page')) {
            searchParams.set('page', 1);
        }

        setSearchParams(searchParams);
    }

    return (
        <div className='rounded-md border px-3 py-1'>
            <label>Sort: </label>
            <select
                className='rounded-md border'
                onChange={(e) => {
                    handleClick(e.target.value);
                }}
            >
                {options.map((option) => {
                    return (
                        <option
                            key={option.value}
                            value={option.value}
                            className={
                                currentFilter === option.value
                                    ? 'border bg-blue-500 font-medium'
                                    : ''
                            }
                        >
                            {option.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
