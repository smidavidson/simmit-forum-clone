import { useNavigate } from 'react-router-dom';
import { usePost } from './usePost';

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
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );
}
