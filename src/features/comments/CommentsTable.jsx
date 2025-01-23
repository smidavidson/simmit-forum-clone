import CommentItem from './CommentItem';
import { useLoadComments } from './useLoadComments';

export default function CommentsTable({ postId }) {
    // Get comments from comments table
    const { isLoading: isLoadingComments, commentsForPost } =
        useLoadComments(postId);

    if (isLoadingComments) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mx-auto max-w-4xl space-y-2 px-4'>
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
