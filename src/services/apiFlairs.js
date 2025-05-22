import toast from 'react-hot-toast';
import supabase from './supabase';

// Get a specific single Post record given a Post ID
export async function getFlairs() {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flairs`, {
            credentials: 'include',
        });

        const resData = await res.json();

        if (!res.ok) {
            toast.error(resData.message || 'Failed to fetch flairs');
            throw new Error(resData.message || 'Failed to fetch flairs');
        }

        return resData;
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
}
