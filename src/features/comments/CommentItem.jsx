import { formatDistance } from 'date-fns';

export default function CommentItem({ comment }) {
    const commentTimeAgo = formatDistance(
        new Date(comment.created_at),
        new Date(),
        {
            addSuffix: true,
        },
    );

    return (
        <div className='rounded-md border border-gray-200 bg-white p-2 shadow-sm'>
            <div>{comment.content}</div>
            <div className='pt-2 text-sm text-gray-500'>
                {comment.profiles.username} • {commentTimeAgo}
            </div>
        </div>
    );
}
