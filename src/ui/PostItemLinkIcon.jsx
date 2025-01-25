import { BiLink } from 'react-icons/bi';

export default function PostItemUrlLink({size = "1em"}) {
    return (
        <div className='rounded-md border text-gray-500 flex items-center'>
            <BiLink size={size}></BiLink>
        </div>
    );
}
