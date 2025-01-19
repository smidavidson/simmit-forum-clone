// Where we directly interact with `posts` table with supabase API

import supabase from './supabase';

export async function getPosts() {
    let query = supabase.from('posts').select(`*, profiles(username)`);

    const { data: posts, error } = await query;

    if (error) {
        console.log('Error fetching posts in apiPosts: ', error);
    }

    // FYI, React query will rename this as data anyways, so renaming it here makes no difference
    return posts;
}

export async function getPost(id) {
    let query = supabase
        .from('posts')
        .select(`*, profiles(username)`)
        .eq('id', id)
        .single();

    const { data: post, error } = await query;

    if (error) {
        console.log('Error fetching a post in apiPosts: ', error);
    }

    return post;
}
