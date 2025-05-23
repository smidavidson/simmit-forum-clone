import { useQuery } from '@tanstack/react-query';
import { getFlairs as getFlairsApi } from '../../services/apiFlairs';
import toast from 'react-hot-toast';

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
        toast.error('Failed to fetch flairs');
        console.log('Error fetching flairs in useFlairs.js: ', error);
    }

    return { flairs, isLoadingFlairs };
}
