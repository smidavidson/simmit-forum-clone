import { Link } from 'react-router-dom';
import { formatDistancePost } from '../../utils/helpers';

export default function PostItemSubtitle({ post }) {
    return (
        <div className='flex flex-wrap text-sm text-gray-500'>
            <div>
                <Link
                    to={`/user/${post.username}/posts`}
                    className='text-gray-700'
                >
                    {post.username}
                </Link>
            </div>
            <div>&nbsp;•&nbsp;</div>
            <div>
                <Link
                    to={`/post/${post.id}`}
                    className='text-gray-700'
                >
                    {post.comment_count} comments
                </Link>
            </div>
            <div>&nbsp;•&nbsp;</div>
            <div>{formatDistancePost(post.created_at)}</div>
        </div>
    );
}
