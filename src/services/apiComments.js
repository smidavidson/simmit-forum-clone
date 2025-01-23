import supabase from './supabase';

export async function getCommentsFromPostId(postId) {
    let query = supabase
        .from('comments')
        .select(`*, profiles(username)`)
        .eq('post_id', postId);

    const { data: comments, error } = await query;

    if (error) {
        console.log('Error fetching comments in apiComments: ', error);
    }

    console.log('postId:', postId);
    console.log('query result:', comments);

    // FYI, React query will rename this as data anyways, so renaming it here makes no difference
    return comments;
}

export async function submitComment() {}
