// Where we directly interact with `posts` table with supabase API

import supabase from './supabase';

// Get all Posts from Posts table
export async function getPosts() {
    let query = supabase.from('posts').select(`*, profiles(username)`);

    const { data: posts, error } = await query;

    if (error) {
        console.log('Error fetching posts in apiPosts: ', error);
    }

    // FYI, React query will rename this as data anyways, so renaming it here makes no difference
    return posts;
}

// Get a specific single Post record given a Post ID
export async function getPost(id) {
    const { data: post, error } = await supabase
        .from('posts')
        .select(`*, profiles(username)`)
        .eq('id', id)
        .single();

    if (error) {
        console.log('Error fetching a post in apiPosts: ', error);
    }

    return post;
}

// Submit a post
export async function submitPost(newPost) {
    // Get user saved in local storage
    const { data: userData } = await supabase.auth.getUser();

    // Post table schema: id, created_at (both are autofilled), title, content, image_url (this can be null for now)
    const { data, error } = await supabase
        .from('posts')
        .insert([{ ...newPost, created_by: userData.user.id }])
        .select();

    if (error) {
        console.log('Post could not be submitted: ', error);
    }

    return data;
}
