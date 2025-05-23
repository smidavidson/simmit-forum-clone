// File for directly dealing with any auth related supabase stuff
import toast from 'react-hot-toast';

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
    try {
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
    } catch (error) {
        console.log(`Error getting current user: ${error.message}`);
        return { success: false, user: null };
    }
}

export async function signup({ username, email, password }) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            },
        );

        const resData = await res.json();

        if (!res.ok) {
            if (res.status === 400) {
                toast.error(resData.message || 'Username and password required',);
            } else if (res.status === 500) {
                if (
                    resData.message.includes('duplicate') ||
                    resData.message.includes('already exists') ||
                    resData.message.includes('unique constraint')
                ) {
                    toast.error('User with this email or username already exists',);
                } else {
                    toast.error('Registration failed. Please try again.');
                }
            }
            throw new Error(resData.message || 'Registration failed');
        }

        toast.success('Registration successful!');
        return { user: resData.user };
    } catch (error) {
        // Don't show toast here if we already showed it above
        if (
            !error.message.includes('duplicate') &&
            !error.message.includes('already exists') &&
            !error.message.includes('unique constraint')
        ) {
            toast.error(
                error.message === 'Failed to fetch'
                    ? 'Failed to connect to server'
                    : error.message,
            );
        }
        throw new Error(error.message);
    }
}
