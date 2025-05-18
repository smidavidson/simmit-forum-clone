import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

// This returns user, and user matching user profile
export function useUser() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            return getCurrentUser();
        },
        // 
        retry: false,
        // Data is cached for 5 mins
        staleTime: 5 * 60 * 1000,
        // Refetch when user goes out then regains focus on window
        refetchOnWindowFocus: true,
    });

    return { user: data?.user, isLoading, error };
}
