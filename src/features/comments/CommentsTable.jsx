import CommentItem from './CommentItem';
import { useLoadComments } from './useLoadComments';

export default function CommentsTable({ commentsForPost }) {
    return (
        <div className='mx-auto max-w-4xl space-y-2'>
            {commentsForPost.map((comment) => {
                return (
                    <CommentItem
                        comment={comment}
                        key={comment.id}
                    ></CommentItem>
                );
            })}
        </div>
    );
}
