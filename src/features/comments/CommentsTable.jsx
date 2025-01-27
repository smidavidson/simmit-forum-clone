import CommentItem from './CommentItem';
import { useLoadComments } from './useLoadComments';

export default function CommentsTable({ commentsForPost, userId }) {
    return (
        <div className='mx-auto max-w-4xl space-y-2'>
            {commentsForPost.map((comment) => {
                return (
                    <CommentItem
                        comment={comment}
                        key={comment.id}
                        isDeletable={userId === comment.created_by}
                    ></CommentItem>
                );
            })}
        </div>
    );
}
