import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePost } from './usePost';
import DisplayComments from '../comments/DisplayComments';
import { useUser } from '../authentication/useUser';
import { formatDistancePost } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useUpdatePost } from './useUpdatePost';

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

    console.log(post);

    return (
        <div className='mx-auto max-w-4xl p-4'>
            <div className=''>
                <div className='mb-4'>
                    {post.link_url ? (
                        <div className='flex flex-wrap items-center'>
                            <a
                                className='mr-2 text-xl font-semibold'
                                href={
                                    post.link_url.startsWith('http')
                                        ? post.link_url
                                        : `https://${post.link_url}`
                                }
                            >
                                {post?.title ? <span>{post?.title}</span> : <span>{"[deleted]"}</span>}
                            </a>
                            <div className='flex items-center text-sm font-thin text-gray-500'>
                                ({post?.link_url})
                            </div>
                        </div>
                    ) : (
                        <h2 className='text-xl font-semibold'>{post?.title ? <span>{post?.title}</span> : <span>{"[deleted]"}</span>}</h2>
                    )}
                    <div className='mt-1 flex flex-wrap text-sm text-gray-500'>
                        <div>
                            <span>Submitted by </span>
                            {post?.profiles?.username ? <Link
                                to={`/user/${post.profiles.username}`}
                                className='text-gray-700'
                            >
                                {post.profiles.username}
                            </Link> : <span>{"[deleted]"}</span>}
                            
                        </div>
                        <div>&nbsp;•&nbsp;</div>
                        <div>{formatDistancePost(post.created_at)}</div>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='rounded-md border bg-white p-2 text-gray-800'>
                        {post.image_url && (
                            <div className='mb-4 flex justify-center'>
                                <a href={post.image_url}>
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className='w-full max-w-[500px] cursor-pointer rounded-md border hover:opacity-90'
                                    ></img>
                                </a>
                            </div>
                        )}
                        <div>{post?.content ? <span>{post.content}</span> : <span>{"[deleted]"}</span> }</div>
                    </div>
                    {isDeletable && (
                        <div>
                            <Button
                                className='mt-2 bg-red-500 hover:bg-red-600'
                                variant='tiny'
                                disabled={isUpdatingPost}
                                onClick={() => updatePost(postId)}
                            >
                                Delete post
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <DisplayComments postId={postId}></DisplayComments>
            </div>
        </div>
    );
}
