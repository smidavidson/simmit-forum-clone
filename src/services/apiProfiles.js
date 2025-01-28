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
    // console.log('getPosts: ', username);

    let query = supabase
        .from('posts')
        .select(`*, profiles!inner(username), flairs(name, color)`, {
            count: 'exact',
        })
        .eq('profiles.username', username)
        .eq('is_deleted', false)
        .order(sortBy.field, {
            ascending: sortBy.direction === 'asc',
        });

    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        // From id to this id
        query = query.range(from, to);
    }

    const { data: userPosts, error, count } = await query;
    console.log(userPosts);

    if (error) {
        toast.error(error.message);
        throw new Error(error);
    }

    return { userPosts, count };
}

// Retrieve comments given a username
export async function getCommentsWithUsername({
    username,
    sortBy = { field: 'created_at', direction: 'desc' },
    page,
}) {
    // console.log('getComments: ', username);

    let query = supabase
        .from('comments')
        .select(`*, profiles!inner(username)`, {
            count: 'exact',
        })
        .eq('profiles.username', username)
        .eq('is_deleted', false)
        .order(sortBy.field, {
            ascending: sortBy.direction === 'asc',
        });

    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        // From id to this id
        query = query.range(from, to);
    }

    const { data: userComments, error, count } = await query;

    console.log('Query results:', {
        commentCount: userComments?.length,
        totalCount: count,
        hasError: !!error,
    });

    if (error) {
        console.error('Full error:', error); 
        throw new Error(error);
    }

    return { userComments, count };
}
