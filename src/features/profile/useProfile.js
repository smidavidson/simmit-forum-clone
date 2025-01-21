import { useQuery } from '@tanstack/react-query';
import { getPosts as getPostsApi } from '../../services/apiProfiles';

export function useProfile(username) {
    const {
        data: userPosts,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['userPosts', username],
        queryFn: () => {
            return getPostsApi(username);
        },
    });
    if (error) {
        console.log('Error fetching user posts in useProfile.js: ', error);
    }

    return { userPosts, isLoading };
}
