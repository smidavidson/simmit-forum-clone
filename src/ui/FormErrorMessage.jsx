import { FaExclamationCircle } from 'react-icons/fa';

export default function FormErrorMessage({ children }) {
    return (
        <span className='ml-2 text-red-500 flex items-center'>
            <FaExclamationCircle className='mr-1'></FaExclamationCircle>
            {children}
        </span>
    );
}
