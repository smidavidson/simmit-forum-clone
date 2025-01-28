import { Link } from 'react-router-dom';
import { formatDistancePost } from '../../utils/helpers';

export default function DisplayPostSubtitle({ post }) {
    return (
        <div className='flex flex-wrap pb-1 text-sm text-gray-500'>
            <div>
                <span>Submitted by </span>
                {post?.is_deleted ? (
                    <span>{'[deleted]'}</span>
                ) : (
                    <Link
                        to={`/user/${post.profiles.username}`}
                        className='text-gray-700'
                    >
                        {post.profiles.username}
                    </Link>
                )}
            </div>
            <div>&nbsp;•&nbsp;</div>
            <div>{formatDistancePost(post.created_at)}</div>
        </div>
    );
}
