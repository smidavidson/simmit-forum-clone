import { useQuery } from '@tanstack/react-query';
import { getCommentsWithUsername as getCommentsWithUsernameApi } from '../../services/apiProfiles';
import { useSearchParams } from 'react-router-dom';

export function useProfileComments({ username }) {
    const [searchParams] = useSearchParams();
    // If page parameter does not exist, assume page is 1
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    const sortBy = { field: 'created_at', direction: 'desc' };

    const {
        data: { userComments, count } = {},
        isLoading: isLoadingUserComments,
        error,
    } = useQuery({
        queryKey: ['userComments', username, page],
        queryFn: () => {
            return getCommentsWithUsernameApi({ username, sortBy, page });
        },
    });
    if (error) {
        console.log('Error fetching user comments in useProfile.js: ', error);
    }

    return { userComments, isLoadingUserComments, count };
}
