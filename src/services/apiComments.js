import toast from 'react-hot-toast';

export async function getCommentsFromPostId(
    postId,
    sortBy = { field: 'created_at', direction: 'desc' },
) {
    try {
        const params = new URLSearchParams();
        params.append('sort_field', sortBy.field);
        params.append('sort_direction', sortBy.direction);

        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/comments/post/${postId}?${params.toString()}`,
            {
                method: 'GET',
                credentials: 'include',
            },
        );

        const resData = res.json();

        if (!res.ok) {
            throw new Error(resData.message || 'Error fetching comments');
        }

        return resData;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
}

// Submit a Comment to a post
export async function submitComment({ commentContent, postId }) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/comments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content: commentContent,
                    postId: postId,
                }),
            },
        );

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || 'Error posting comment');
        }

        return resData;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
}

export async function getCommentsFromUsername({ username }) {
    let query = supabase
        .from('comments')
        .select(`*, profiles(username)`)
        .eq('username', username);

    const { data: comments, error } = await query;

    if (error) {
        // console.log(
        //     `Error fetching comments for user: ${username} in apiComments: `,
        //     error,
        // );
        toast.error(error.message);
        throw new Error(error.message);
    }

    // console.log('query result:', comments);
    return comments;
}

// This actually deletes the post (but deletion does not actually delete the record, it only sets some columns to null)
export async function updateComment(commentId) {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`, {
            method: "DELETE",
            credentials: 'include',
        })
        
        const resData = await res.json();
        
        if (!res.ok) {
            throw new Error(error.message || "Error deleting comment");    
        }   

        return resData.commentId;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }

    // console.log('Attempting to update comment:', commentId);

    // Don't need to pass anything
    const { data: comment, error } = await supabase
        .from('comments')
        .update({ is_deleted: true })
        .eq('id', commentId)
        .select();

    if (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }

    // console.log('Comment update result:', comment);
    return comment;
}
