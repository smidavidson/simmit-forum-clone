import { usePost } from './usePost';

export default function DisplayPost() {
    const { post, isLoading } = usePost();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // For now just display the postId
    return (
        <div>
            POST:{post.content}
        </div>
    );
}
