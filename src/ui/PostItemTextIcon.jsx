import { BsTextLeft } from 'react-icons/bs';

export default function PostItemTextIcon({ size = '1em' }) {
    return (
        <div className='rounded-md border text-gray-500'>
            <BsTextLeft size={size}></BsTextLeft>
        </div>
    );
}
