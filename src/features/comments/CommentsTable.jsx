import CommentItem from './CommentItem';

export default function CommentsTable({
    commentsForPost,
    user,
    isPreview = false,
    className = '',
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {commentsForPost.map((comment) => {
                return (
                    <CommentItem
                        comment={comment}
                        key={comment.id}
                        isDeletable={user?.user_id === comment.created_by}
                        isPreview={isPreview}
                    ></CommentItem>
                );
            })}
        </div>
    );
}
