import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import PostItemUrlLink from '../../ui/PostItemLinkIcon';

import PostItemTextIcon from '../../ui/PostItemTextIcon';

export default function PostItem({ post }) {
    const postTimeAgo = formatDistance(new Date(post.created_at), new Date(), {
        addSuffix: true,
    });

    return (
        <div className='flex rounded-md border border-gray-200 bg-white p-2 shadow-sm'>
            {post?.link_url ? (
                <PostItemUrlLink size={48}></PostItemUrlLink>
            ) : (
                <PostItemTextIcon size={48}></PostItemTextIcon>
            )}
            <div className='flex flex-col justify-center px-3'>
                <h2 className='text-md mb-1 font-medium'>
                    {post?.link_url ? (
                        <div className='flex items-center'>
                            <a
                                href={
                                    post.link_url.startsWith('http')
                                        ? post.link_url
                                        : `https://${post.link_url}`
                                }
                            >
                                {post.title}
                            </a>

                            <div className='mx-2 flex items-center text-sm font-thin text-gray-500'>
                                ({post?.link_url})
                            </div>
                        </div>
                    ) : (
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    )}
                </h2>
                <div className='text-sm text-gray-500'>
                    <Link
                        to={`/user/${post.profiles.username}`}
                        className='text-gray-700'
                    >
                        {post.profiles.username}
                    </Link>{' '}
                    •{' '}
                    <Link to={`/post/${post.id}`} className='text-gray-700'>
                        {post.comment_count} comments
                    </Link>{' '}
                    • {postTimeAgo}
                </div>
            </div>
        </div>
    );
}
