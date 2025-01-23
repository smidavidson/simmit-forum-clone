import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from './usePost';
import DisplayComments from '../comments/DisplayComments';

export default function DisplayPost() {
    // Get postId from URL
    const { postId } = useParams();
    const navigate = useNavigate();

    const { post, isLoading } = usePost();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // For now just display the postId
    return (
        <div className='mx-auto max-w-4xl p-4'>
            <div className='py-2'>
                <h2 className='mb-4 text-xl font-semibold'>{post.title}</h2>
                <div className='mb-4 rounded-md border bg-white p-2 text-gray-800'>
                    {post.content}
                </div>
            </div>
            <div>
                <DisplayComments postId={postId}></DisplayComments>
            </div>
        </div>
    );
}
