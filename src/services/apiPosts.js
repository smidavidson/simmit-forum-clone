// Where we directly interact with `posts` table with supabase API

import toast from 'react-hot-toast';
import supabase from './supabase';

// Get all Posts from Posts table
export async function getPosts(
    sortBy = { field: 'created_at', direction: 'desc' },
) {
    let query = supabase
        .from('posts')
        .select(`*, profiles(username)`)
        .order(sortBy.field, {
            ascending: sortBy.direction === 'asc',
        });

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

    let imageUrl = null;
    if (newPost.image) {
        const file = newPost.image;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        console.log(fileName);

        // Upload image
        const { error: storageError } = await supabase.storage
            .from('post-images')
            .upload(fileName, file, {
                metadata: {
                    owner: userData.user.id, // Set owner to current user's ID
                },
            });

        if (storageError) {
            console.error(
                'Full storage error:',
                JSON.stringify(storageError, null, 2),
            );
            throw new Error('Image could not be uploaded');
        }

        // Get URL after image has been uploaded
        const {
            data: { publicUrl },
        } = supabase.storage.from('post-images').getPublicUrl(fileName);

        imageUrl = publicUrl;
    }

    console.log(`imageUrl: `, imageUrl);

    // Post table schema: id, created_at (both are autofilled), title, content, image_url (this can be null for now)
    const { data, error } = await supabase
        .from('posts')
        .insert([
            {
                title: newPost.title,
                content: newPost.content,
                created_by: userData.user.id,
                link_url: newPost.image ? imageUrl : newPost.link_url,
            },
        ])
        .select();

    if (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }

    return data[0];
}
