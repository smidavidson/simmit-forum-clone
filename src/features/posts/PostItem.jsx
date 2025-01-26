import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import PostItemUrlLink from '../../ui/PostItemLinkIcon';

import PostItemTextIcon from '../../ui/PostItemTextIcon';
import { displayUrl, formatDistancePost } from '../../utils/helpers';

export default function PostItem({ post }) {
    // const postTimeAgo = formatDistance(new Date(post.created_at), new Date(), {
    //     addSuffix: true,
    // });

    return (
        <div className='flex rounded-md border border-gray-200 bg-white p-2 shadow-sm'>
            {post?.link_url ? (
                <PostItemUrlLink size={48}></PostItemUrlLink>
            ) : (
                <PostItemTextIcon size={48}></PostItemTextIcon>
            )}
            <div className='flex w-full flex-col justify-center px-3'>
                <h2 className='text-md mb-1 font-medium'>
                    {post?.link_url ? (
                        <div className='flex flex-wrap items-center'>
                            <a href={post.link_url} className='mr-2'>
                                {post.title}
                            </a>
                            <div className='flex items-center text-sm font-thin group text-gray-500'>
                                <span>({displayUrl(post.link_url)})</span>
                                <span className='absolute left-0 z-10 hidden rounded bg-white p-1 shadow-lg group-hover:block'>
                                    {post.link_url}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    )}
                </h2>

                <div className='flex flex-wrap text-sm text-gray-500'>
                    <div>
                        <Link
                            to={`/user/${post.profiles.username}`}
                            className='text-gray-700'
                        >
                            {post.profiles.username}
                        </Link>
                    </div>
                    <div>&nbsp;•&nbsp;</div>
                    <div>
                        <Link to={`/post/${post.id}`} className='text-gray-700'>
                            {post.comment_count} comments
                        </Link>
                    </div>
                    <div>&nbsp;•&nbsp;</div>
                    <div>{formatDistancePost(post.created_at)}</div>
                </div>
            </div>
        </div>
    );
}
