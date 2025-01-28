import { useQuery } from '@tanstack/react-query';
import { getPostsWithUsername as getPostsWithUsernameApi } from '../../services/apiProfiles';
import { useSearchParams } from 'react-router-dom';

export function useProfilePosts({ username }) {
    const [searchParams] = useSearchParams();
    // If page parameter does not exist, assume page is 1
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    const sortBy = { field: 'created_at', direction: 'desc' };

    const {
        data: { userPosts, count } = {},
        isLoading: isLoadingUserPosts,
        error,
    } = useQuery({
        queryKey: ['userPosts', username, page],
        queryFn: () => {
            return getPostsWithUsernameApi({ username, sortBy, page });
        },
    });
    if (error) {
        console.log('Error fetching user posts in useProfile.js: ', error);
    }

    return { userPosts, isLoadingUserPosts, count };
}
