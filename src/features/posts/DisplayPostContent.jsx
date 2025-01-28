export default function DisplayPostContent({ post }) {
    return (
        <div>
            {post?.is_deleted ? (
                <span>{'[deleted]'}</span>
            ) : (
                <span>{post.content}</span>
            )}
        </div>
    );
}
