import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

export default function PostItem({ post }) {
    const postTimeAgo = formatDistance(new Date(post.created_at), new Date(), {
        addSuffix: true,
    });

    return (
        <div className='rounded-md border border-gray-200 bg-white p-2 shadow-sm'>
            <h2 className='text-md mb-1 font-medium'>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <div className='text-sm text-gray-500'>
                <Link
                    to={`/user/${post.profiles.username}`}
                    className='text-gray-700'
                >
                    {post.profiles.username}
                </Link>{' '}
                •{' '}
                <Link to={`/post/${post.id}`} className='text-gray-700'>
                    {post.comment_count} comments
                </Link>{' '}
                • {postTimeAgo}
            </div>
        </div>
    );
}
