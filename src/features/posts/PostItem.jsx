import { Link } from 'react-router-dom';
import { displayUrl, formatDistancePost } from '../../utils/helpers';

import PostItemUrlLink from '../../ui/PostItemLinkIcon';
import PostItemTextIcon from '../../ui/PostItemTextIcon';
import PostItemIcon from './PostItemIcon';
import PostItemTitle from './PostItemTitle';
import PostItemSubtitle from './PostItemSubtitle';

export default function PostItem({ post }) {
    // const postTimeAgo = formatDistance(new Date(post.created_at), new Date(), {
    //     addSuffix: true,
    // });

    return (
        <div className='flex rounded-md border border-gray-200 bg-white p-2 shadow-sm'>
            <PostItemIcon linkUrl={post?.link_url}></PostItemIcon>
            <div className='flex w-full flex-col justify-center px-3'>
                <PostItemTitle post={post}></PostItemTitle>
                <PostItemSubtitle post={post}></PostItemSubtitle>
            </div>
        </div>
    );
}
