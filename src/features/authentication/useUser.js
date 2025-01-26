import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

// This returns user, and user matching user profile
export function useUser() {
    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            return getCurrentUser();
        },
    });

    return { user, isLoading: isUserLoading };
}
