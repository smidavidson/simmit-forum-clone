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
            POST:{post.content}
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
