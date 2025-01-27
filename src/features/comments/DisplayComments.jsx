import CommentsTable from './CommentsTable';
import CommentSubmissionForm from './CommentSubmissionForm';
import { useLoadComments } from './useLoadComments';

export default function DisplayComments({ postId, userId = null }) {
    // Get comments from comments table
    const { isLoading: isLoadingComments, commentsForPost } =
        useLoadComments(postId);

    if (isLoadingComments) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='mb-1 font-medium'>
                {commentsForPost.length} comments:{' '}
            </div>
            <hr className='mb-4 border-t-2 border-dotted'></hr>
            <CommentSubmissionForm postId={postId}></CommentSubmissionForm>
            <CommentsTable commentsForPost={commentsForPost} userId={userId}></CommentsTable>
        </div>
    );
}
