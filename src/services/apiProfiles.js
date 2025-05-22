import toast from 'react-hot-toast';
import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

// used to retrieve profile of a given user id (avatar, username, about, etc)
// Called by useUser to retrieve username mainly
export async function getProfile(userId) {
    const { data: username, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single();

    if (error) {
        console.log('Error fetching a post in apiProfiles: ', error);
    }

    return username;
}

// Retrieve posts given an username
export async function getPostsWithUsername({
    username,
    sortBy = { field: 'created_at', direction: 'desc' },
    page,
}) {
    try {
        const params = new URLSearchParams();
        params.append('sortBy', JSON.stringify(sortBy));
        if (page) {
            params.append('page', page.toString());
        }
        params.append('pageSize', PAGE_SIZE.toString());

        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/posts/user/${username}?${params}`,
            {
                credentials: 'include',
            },
        );

        const resData = await res.json();

        if (!res.ok) {
            toast.error(resData.message || 'Failed to fetch user posts');
            throw new Error(resData.message || 'Failed to fetch user posts');
        }

        return { userPosts: resData.userPosts, count: resData.count };
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
}

// Retrieve comments given a username
export async function getCommentsWithUsername({
    username,
    sortBy = { field: 'created_at', direction: 'desc' },
    page,
}) {
    try {
        const params = new URLSearchParams();
        params.append('sortBy', JSON.stringify(sortBy));
        if (page) params.append('page', page.toString());
        params.append('pageSize', PAGE_SIZE.toString());

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/comments/user/${username}?${params}`,
            {
                credentials: 'include',
            },
        );

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to fetch user comments');
            throw new Error(
                errorData.message || 'Failed to fetch user comments',
            );
        }

        const data = await response.json();
        return { userComments: data.userComments, count: data.count };
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
}
