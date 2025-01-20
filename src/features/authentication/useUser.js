import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { getProfile } from '../../services/apiProfiles';

// This returns user, and user matching user profile
export function useUser() {
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            return getCurrentUser();
        },
    });

    const { data: profile, isLoading: profileLoading } = useQuery({
        queryKey: ['profile', user?.id],
        queryFn: () => {
            return getProfile(user?.id);
        },
        enabled: !!user?.id,
    });

    return { user, profile, isLoading: userLoading };
}
