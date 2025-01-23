import CommentsTable from './CommentsTable';
import CommentSubmissionForm from './CommentSubmissionForm';

export default function DisplayComments({ postId }) {
    return (
        <div>
            <CommentSubmissionForm postId={postId}></CommentSubmissionForm>
            <CommentsTable postId={postId}></CommentsTable>
        </div>
    );
}
