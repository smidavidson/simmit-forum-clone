import { useNavigate } from 'react-router-dom';
import { usePost } from './usePost';
import CommentsTable from '../comments/CommentsTable';

export default function DisplayPost() {
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
                <CommentsTable postId={post.id}></CommentsTable>
            </div>
        </div>
    );
}
