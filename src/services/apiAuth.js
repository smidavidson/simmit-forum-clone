// File for directly dealing with any auth related supabase stuff

import toast from 'react-hot-toast';
import supabase from './supabase';

// Used to login
export async function login({ email, password }) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                }),
            },
        );

        const resData = await res.json();

        if (!res.ok) {
            toast.error(resData.message);
            throw new Error(resData.message);
        }

        // onSuccess receives this object
        return { user: resData.user };
    } catch (error) {
        throw new Error(
            error.message === 'Failed to fetch'
                ? 'Failed to fetch login'
                : error.message,
        );
    }
}

// Use to logout
export async function logout() {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
            {
                method: 'GET',
                credentials: 'include',
            },
        );

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || 'Logout failed');
        }

        return resData;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error);
    }
}

// Used to get user data after refresh (because React Query loses session data on refresh)
export async function getCurrentUser() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        console.log(`User auth was invalid`);
        return { success: false, user: null };
    }

    const resData = await res.json();

    console.log(`User auth was valid`);

    return { user: resData.user };
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

    // console.log('apiAuth: ', data);
    // console.log(error);

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
