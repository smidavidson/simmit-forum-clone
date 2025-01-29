// Hook to interact with apiBookings.js

import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/apiPosts';
import { useSearchParams } from 'react-router-dom';

// Returns posts from post table
export function usePosts() {
    const [searchParams] = useSearchParams();
    // If page parameter does not exist, assume page is 1
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    const sort = !searchParams.get('sort') ? 'new' : searchParams.get('sort');

    const sortBy = {
        field: 'created_at',
        direction: sort === 'new' ? 'desc' : 'asc',
    };

    // Data returned from queryFn is always returned as 'data' regardless of renaming FYI
    const {
        data: { posts, count } = {},
        isLoading: isLoadingPosts,
        error,
    } = useQuery({
        queryKey: ['posts', page, sortBy],
        queryFn: () => {
            return getPosts({ sortBy, page });
        },
    });
    if (error) {
        console.log('Error fetching posts in usePosts: ', error);
    }

    return { isLoadingPosts, posts, count };
}
