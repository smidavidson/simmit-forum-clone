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
