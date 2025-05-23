// Where we directly interact with `posts` table with supabase API

import toast from 'react-hot-toast';
import { PAGE_SIZE } from '../utils/constants';

// Get all Posts from Posts table
export async function getPosts({
    sortBy = { field: 'created_at', direction: 'desc' },
    page,
    filter, // Only filter when not set to none
}) {
    try {
        const params = new URLSearchParams();
        params.append('sort_field', sortBy.field);
        params.append('sort_direction', sortBy.direction);

        if (page) {
            params.append('page', page);
        }

        if (filter && filter !== 'none') {
            params.append('filter', filter);
        }

        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/posts?${params.toString()}`,
            {
                method: 'GET',
                credentials: 'include',
            },
        );

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || 'Error fetching posts');
        }

        return { posts: resData.posts, count: resData.count };
    } catch (error) {
        throw new Error(
            error.message === 'Failed to fetch'
                ? 'Failed to fetch posts'
                : error.message,
        );
    }
}

// Get a specific single Post record given a Post ID
export async function getPost(id) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`,
            {
                method: 'GET',
                credentials: 'include',
            },
        );

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || 'Error fetching post');
        }

        return resData;
    } catch (error) {
        throw new Error(
            error.message === 'Failed to fetch'
                ? 'Failed to fetch post'
                : error.message,
        );
    }
}

// This actually deletes the post (but deletion does not actually delete the record, it only sets some columns to null)
export async function updatePost(postId) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        const resData = res.json();

        if (!res.ok) {
            toast.error(resData.message || 'Failed to delete post');
            throw new Error(resData.message || 'Failed to delete post');
        }

        return resData.post_id;
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
}

// Submit a post
export async function submitPost(newPost) {
    console.log(newPost);
    try {
        // first upload the image to the S3 bucket
        let imageUrl = null;
        let imageKey = null;
        if (newPost.image) {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/s3/upload_url`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fileName: newPost.image.name,
                        fileType: newPost.image.type,
                    }),
                    credentials: 'include',
                },
            );

            if (!res.ok) {
                return { success: false, message: 'Could not upload image' };
            }
            const { uploadUrl, key } = await res.json();

            // Post the image to the URL
            const s3Res = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': newPost.image.type,
                },
                body: newPost.image,
            });

            if (!s3Res.ok) {
                throw new Error(`Upload failed`);
            }

            imageKey = key;
            imageUrl = `${import.meta.env.VITE_BUCKET_URL}${imageKey}`;
        }

        // Now post the new post to the backend
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                title: newPost.title,
                content: newPost.content,
                link_url: newPost.link_url || null,
                flair: newPost.flair,
                image_url: imageUrl,
                image_key: imageKey,
            }),
        });

        if (!res.ok) {
            throw new Error(error.message || 'Error creating post');
        }

        const post = await res.json();
        return post;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
}
