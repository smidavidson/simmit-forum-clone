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
                {post.link_url ? (
                    <div className='mb-4 flex flex-wrap items-center'>
                        <a
                            className='text-xl font-semibold mr-2'
                            href={
                                post.link_url.startsWith('http')
                                    ? post.link_url
                                    : `https://${post.link_url}`
                            }
                        >
                            {post.title}
                        </a>
                        <div className='flex items-center text-sm font-thin text-gray-500'>
                            ({post?.link_url})
                        </div>
                    </div>
                ) : (
                    <h2 className='mb-4 text-xl font-semibold'>{post.title}</h2>
                )}

                <div className='mb-4 rounded-md border bg-white p-2 text-gray-800'>
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
                    {post.content}
                </div>
            </div>
            <div>
                <DisplayComments postId={postId}></DisplayComments>
            </div>
        </div>
    );
}
