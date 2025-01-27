import { formatDistance } from 'date-fns';
import Button from '../../ui/Button';
import { formatDistancePost } from '../../utils/helpers';
import { useUpdateComment } from './useUpdateComment';

export default function CommentItem({ comment, isDeletable }) {
    const { updateComment, isUpdatingComment } = useUpdateComment();

    return (
        <div className='rounded-md border border-gray-200 bg-white p-2 shadow-sm'>
            <div>
                {comment?.is_deleted ? (
                    <span>{'[deleted]'}</span>
                ) : (
                    <span>{comment?.content}</span>
                )}
            </div>
            <div className='flex flex-wrap pt-2'>
                <div className='mr-3 flex flex-wrap text-sm text-gray-500'>
                    <div>
                        {comment?.is_deleted ? (
                            <span>{'[deleted]'}</span>
                        ) : (
                            <span>{comment?.profiles?.username}</span>
                        )}
                    </div>
                    <div>&nbsp;•&nbsp;</div>
                    <div>{formatDistancePost(comment.created_at)}</div>
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
