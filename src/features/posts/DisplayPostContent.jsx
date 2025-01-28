export default function DisplayPostContent({ post }) {
    return (
        <div>
            {post?.is_deleted ? (
                <span>{'[deleted]'}</span>
            ) : (
                <span className='whitespace-pre-wrap break-words'>
                    {post.content}
                </span>
            )}
        </div>
    );
}
