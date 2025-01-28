import CommentItem from './CommentItem';

export default function CommentsTable({ commentsForPost, userId, isPreview = false }) {
    return (
        <div className='mx-auto max-w-4xl space-y-2'>
            {commentsForPost.map((comment) => {
                return (
                    <CommentItem
                        comment={comment}
                        key={comment.id}
                        isDeletable={userId === comment.created_by}
                        isPreview = {isPreview}
                    ></CommentItem>
                );
            })}
        </div>
    );
}
