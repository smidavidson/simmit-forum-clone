import { useQuery } from '@tanstack/react-query';
import { getPostsWithUsername as getPostsWithUsernameApi } from '../../services/apiProfiles';

export function useProfile({username}) {
    const {
        data: userPosts,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['userPosts', username],
        queryFn: () => {
            return getPostsWithUsernameApi({username});
        },
    });
    if (error) {
        console.log('Error fetching user posts in useProfile.js: ', error);
    }

    return { userPosts, isLoading };
}
