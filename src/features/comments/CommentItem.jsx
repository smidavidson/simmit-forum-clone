import Button from '../../ui/Button';
import { formatDistancePost } from '../../utils/helpers';
import { useUpdateComment } from './useUpdateComment';
import { Link } from 'react-router-dom';

export default function CommentItem({ comment, isDeletable, isPreview }) {
    const { updateComment, isUpdatingComment } = useUpdateComment();
    // console.log(comment);

    return (
        <div className='rounded-md border border-gray-200 bg-white p-2 shadow-sm'>
            <div>
                {comment?.is_deleted ? (
                    <span>{'[deleted]'}</span>
                ) : (
                    <span className='whitespace-pre-wrap break-words'>
                        {comment?.content}
                    </span>
                )}
            </div>
            <div className='flex flex-wrap pt-2'>
                <div className='mr-3 flex flex-wrap items-center text-sm text-gray-500'>
                    <div>
                        {comment?.is_deleted ? (
                            <span>{'[deleted]'}</span>
                        ) : (
                            <Link to={`/user/${comment.username}`}>
                                {comment?.username}
                            </Link>
                        )}
                    </div>
                    <div>&nbsp;•&nbsp;</div>
                    <div>{formatDistancePost(comment.created_at)}</div>
                    {isPreview && (
                        <>
                            <div>&nbsp;•&nbsp;</div>
                            <Link
                                to={`/post/${comment.post_id}`}
                                className='underline'
                            >
                                full thread
                            </Link>
                        </>
                    )}
                </div>
                {isDeletable && (
                    <div>
                        <Button
                            className='cursor-pointer text-red-500'
                            variant='inline'
                            disabled={isUpdatingComment}
                            onClick={() => updateComment(comment.id)}
                        >
                            delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
