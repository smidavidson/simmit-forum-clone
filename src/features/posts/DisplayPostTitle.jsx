import Flair from '../../ui/Flair';

export default function DisplayPostTitle({ post }) {
    const hasLinkUrl = post?.link_url;

    return (
        <div className='flex flex-wrap items-center pb-3'>
            <div className='pr-2'>
                {hasLinkUrl ? (
                    <LinkPostTitle post={post}></LinkPostTitle>
                ) : (
                    <TextPostTitle post={post}></TextPostTitle>
                )}
            </div>
            <div>
                {!post.is_deleted && (
                    <Flair color={post.flairs.color} className='mr-2'>
                        {post.flairs.name}
                    </Flair>
                )}
            </div>
            <div>
                <LinkImageUrlSubtitle post={post}></LinkImageUrlSubtitle>
            </div>
        </div>
    );
}

function LinkImageUrlSubtitle({ post }) {
    return (
        <div className='break-all text-sm font-thin text-gray-500'>
            {(post?.link_url || post?.image_url) &&
                (post?.link_url ? (
                    <span>({post?.link_url})</span>
                ) : (
                    <span>({post?.image_url})</span>
                ))}
        </div>
    );
}

// Title used when link_url exists
function LinkPostTitle({ post }) {
    return (
        <div className=''>
            <a
                className='text-xl font-semibold'
                href={
                    post.link_url.startsWith('http')
                        ? post.link_url
                        : `https://${post.link_url}`
                }
            >
                {post?.is_deleted ? (
                    <span>{'[deleted]'}</span>
                ) : (
                    <span>{post?.title}</span>
                )}
            </a>
        </div>
    );
}

// Title used when no link_url exists
function TextPostTitle({ post }) {
    return (
        <h2 className='text-xl font-semibold'>
            {post?.is_deleted ? (
                <span>{'[deleted]'}</span>
            ) : (
                <span>{post?.title}</span>
            )}
        </h2>
    );
}
