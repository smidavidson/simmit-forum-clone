import supabase from './supabase';

export async function getCommentsFromPostId(
    postId,
    sortBy = { field: 'created_at', direction: 'desc' },
) {
    let query = supabase
        .from('comments')
        .select(`*, profiles(username)`)
        .eq('post_id', postId)
        .order(sortBy.field, {
            ascending: sortBy.direction === 'asc',
        });

    const { data: comments, error } = await query;

    if (error) {
        console.log('Error fetching comments in apiComments: ', error);
    }

    console.log('postId:', postId);
    console.log('query result:', comments);

    // FYI, React query will rename this as data anyways, so renaming it here makes no difference
    return comments;
}

// Submit a Comment to a post
export async function submitComment({ commentContent, postId }) {
    console.log(`retrieved comment content: `, commentContent);

    // Get user saved in local storage
    const { data: userData } = await supabase.auth.getUser();

    // Comments table schema: id, created_at (both are autofilled), post_id, created_by
    const { data, error } = await supabase
        .from('comments')
        .insert([
            {
                content: commentContent,
                post_id: postId,
                created_by: userData.user.id,
            },
        ])
        .select();

    if (error) {
        console.log('Comment could not be submitted: ', error);
    }

    return data;
}
