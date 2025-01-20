// File for directly dealing with any auth related supabase stuff

import supabase from './supabase';

// Used to login
export async function login({ email, password }) {
    // On success supabase saves session data to localStorage
    let { data: sessionData, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.log('Error logging in apiAuth: ', error);
    }

    return sessionData;
}

// Used to get user data after refresh (because React Query loses session data on refresh)
export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return null;
    }

    const { data, error } = await supabase.auth.getUser();
    // console.log(data);

    if (error) {
        throw new Error(error.message);
    }

    return data?.user;
}
