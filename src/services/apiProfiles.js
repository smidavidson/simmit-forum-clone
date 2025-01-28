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
export async function getPostsWithUsername({username, sortBy = { field: 'created_at', direction: 'desc' }}) {
    console.log('getPosts: ', username);

    const { data: posts, error } = await supabase
        .from('posts')
        .select(
            `
        *,
        profiles!inner(username),
        flairs(name, color)
    `,
        )
        .eq('profiles.username', username)
        .order(sortBy.field, {
            ascending: sortBy.direction === 'asc',
        });


    if (error) {
        console.log(
            'Error fetching user post data from apiProfiles.js: ',
            error,
        );
    }

    return posts;
}
