import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePost } from './usePost';
import DisplayComments from '../comments/DisplayComments';
import { useUser } from '../authentication/useUser';
import { formatDistancePost } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useUpdatePost } from './useUpdatePost';
import DisplayPostSubtitle from './DisplayPostSubtitle';
import DisplayPostTitle from './DisplayPostTitle';
import DisplayPostImage from './DisplayPostImage';
import DisplayPostContent from './DisplayPostContent';

export default function DisplayPost() {
    // Get postId from URL
    const { postId } = useParams();
    const navigate = useNavigate();

    const { post, isLoadingPost } = usePost();
    const { user, isUserLoading } = useUser();
    const { updatePost, isUpdatingPost } = useUpdatePost();

    if (isLoadingPost || isUserLoading) {
        return <div>Loading...</div>;
    }

    let isDeletable = false;
    // If user is logged show delete post option
    if (user) {
        if (user.id === post.created_by) isDeletable = true;
    }

    // console.log(post);

    return (
        <div className='mx-auto max-w-4xl p-4'>
            <div className=''>
                <div className=''>
                    <DisplayPostTitle post={post}></DisplayPostTitle>
                    <DisplayPostSubtitle post={post}></DisplayPostSubtitle>
                </div>
                <div className='mb-4'>
                    <div className='rounded-md border bg-white p-2 text-gray-800'>
                        <DisplayPostImage post={post}></DisplayPostImage>
                        <DisplayPostContent post={post}></DisplayPostContent>
                    </div>
                    {isDeletable && (
                        <div>
                            <Button
                                className='mt-2 cursor-pointer text-red-500'
                                variant='inline'
                                disabled={isUpdatingPost}
                                onClick={() => updatePost(postId)}
                            >
                                delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <DisplayComments
                    postId={postId}
                    userId={user?.id}
                ></DisplayComments>
            </div>
        </div>
    );
}
