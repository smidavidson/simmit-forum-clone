import toast from 'react-hot-toast';

// Get a specific single Post record given a Post ID
export async function getFlairs() {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flairs`, {
            credentials: 'include',
        });

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || 'Failed to fetch flairs');
        }

        return resData;
    } catch (error) {
        throw error;
    }
}
