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
    const errors = [];

    // Check if username already exists
    const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

    if (existingUser) {
        errors.push('Username already taken');
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

    console.log("apiAuth: ", data);
    console.log(error);

    // (If confirm email is disabled) AuthApiError returned with message: "User already registered"
    const userAlreadyExistsConfirmEmail =
        error?.message === 'User already registered';
    if (userAlreadyExistsConfirmEmail) {
        // console.log("bro: ", userAlreadyExistsConfirmEmail)
        errors.push('User already registered');
    }

    // (If confirm email is enabled) Fake user data is returned with a empty user identities array which means email has already been used
    const userAlreadyExists = data?.user?.identities?.length === 0;
    if (userAlreadyExists) {
        // console.log("bro: ", userAlreadyExists)
        errors.push('User already registered');
    }

    if (errors.length != 0) {
        throw new Error(JSON.stringify(errors));
    }

    return data;
}
