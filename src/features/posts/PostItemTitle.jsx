import { Link } from 'react-router-dom';
import { displayUrl } from '../../utils/helpers';
import Flair from '../../ui/Flair';

export default function PostItemTitle({ post }) {
    const hasLinkUrl = post?.link_url;

    return (
        <h2 className='text-md mb-1 flex flex-wrap items-center font-medium'>
            <Flair variant='inline' className={`mr-2`} color={post.flairs?.color}>
                {post.flairs?.name}
            </Flair>
            {hasLinkUrl ? (
                <LinkPostTitle
                    url={post.link_url}
                    title={post.title}
                ></LinkPostTitle>
            ) : (
                <TextPostTitle id={post.id} title={post.title}></TextPostTitle>
            )}
        </h2>
    );
}

// Title used when link_url exists
function LinkPostTitle({ url, title }) {
    return (
        <div className='flex flex-wrap items-center'>
            <a href={url} className='mr-2'>
                {title}
            </a>
            <div className='group flex items-center text-sm font-thin text-gray-500'>
                <span>({displayUrl(url)})</span>
                <span className='absolute left-0 z-10 hidden rounded bg-white p-1 shadow-lg group-hover:block'>
                    {url}
                </span>
            </div>
        </div>
    );
}

// Title used when no link_url exists
function TextPostTitle({ id, title }) {
    return <Link to={`/post/${id}`}>{title}</Link>;
}
