import { useQuery } from '@tanstack/react-query';
import { getFlairs as getFlairsApi } from '../../services/apiFlairs';

export function useFlairs() {
    const {
        data: flairs,
        error,
        isLoading: isLoadingFlairs,
    } = useQuery({
        queryKey: ['flairs'],
        queryFn: () => {
            return getFlairsApi();
        },
    });
    if (error) {
        console.log('Error fetching flairs in useFlairs.js: ', error);
    }

    return { flairs, isLoadingFlairs };
}
