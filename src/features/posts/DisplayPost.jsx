import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from './usePost';
import CommentsTable from '../comments/CommentsTable';
import DisplayComments from '../comments/DisplayComments';

export default function DisplayPost() {
    const {postId} = useParams();
    const navigate = useNavigate();

    const { post, isLoading } = usePost();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // For now just display the postId
    return (
        <div>
            <div>Title: {post.title}</div>
            <div>Content: {post.content}</div>
            <div>
                <DisplayComments postId={postId}></DisplayComments>
            </div>
        </div>
    );
}
