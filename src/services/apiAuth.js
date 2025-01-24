// File for directly dealing with any auth related supabase stuff

import supabase from './supabase';

// Used to login
export async function login({ email, password }) {
    // On success supabase saves session data to localStorage
    let { data: sessionData, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    console.log(sessionData);

    if (error) {
        console.log('Error logging in apiAuth: ', error);
    }

    return sessionData;
}

// Use to logout
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log('Error logging out in apiAuth: ', error);
    }
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

export async function signup({ username, email, password }) {
    // Check if username already exists
    const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

    if (existingUser) {
        throw new Error('Username already taken');
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username,
                avatar: '', // Put avatar here later
            },
        },
    });


    // If user identities array is empty then email has already been used
    const userAlreadyExists = data?.user?.identities?.length === 0;
    if (userAlreadyExists) {
        throw new Error('User already registered');
    }

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
