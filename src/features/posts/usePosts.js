// Hook to interact with apiBookings.js

import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/apiPosts';
import { useSearchParams } from 'react-router-dom';


// Returns posts from post table
export function usePosts() {
    const [searchParams] = useSearchParams();
    // If page parameter does not exist, set one
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    const sortBy = { field: 'created_at', direction: 'desc' };

    // Data returned from queryFn is always returned as 'data' regardless of renaming FYI
    const {
        isLoading: isLoadingPosts,
        data: { posts, count } = {},
        error,
    } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => {
            return getPosts({ sortBy, page });
        },
        keepPreviousData: true,
    });
    if (error) {
        console.log('Error fetching posts in usePosts: ', error);
    }

    return { isLoadingPosts, posts, count };
}
