// Hook to interact with apiBookings.js

import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/apiPosts';

export function usePosts() {

    // Data returned from queryFn is always returned as 'data' regardless of renaming FYI
    const {
        isLoading,
        data: posts,
        error,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: () => {
            return getPosts();
        },
    });
    if (error) {
        console.log("Error fetching posts in usePosts: ", error);
    }

    return { isLoading, posts };
}
