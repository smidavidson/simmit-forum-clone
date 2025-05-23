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

    const { post, isLoadingPost } = usePost();
    const { user, isUserLoading } = useUser();
    const { updatePost, isUpdatingPost } = useUpdatePost();

    if (isLoadingPost || isUserLoading) {
        return (
            <div className='flex items-center justify-center'>
                <div className='mx-auto flex max-w-4xl flex-col items-center space-y-2 px-4 py-2'>
                    <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
                    <p className='text-sm text-gray-600'>Loading post...</p>
                </div>
            </div>
        );
    }

    let isDeletable = false;
    // If user is logged show delete post option
    if (user) {
        if (user.user_id === post.created_by) {
            isDeletable = true;
        }
    }

    if (!post) {
        return (
            <div className='flex h-64 items-center justify-center'>
                <div className='space-y-2 text-center'>
                    <p className='text-lg font-semibold text-gray-800'>
                        Post not found
                    </p>
                </div>
            </div>
        );
    }

    // console.log(post);
    // console.log(user);

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
                <DisplayComments postId={postId} user={user}></DisplayComments>
            </div>
        </div>
    );
}
