import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../services/apiAuth';

export default function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: () => {
            return logoutApi();
        },
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/', { replace: true });
        },
        onError: (error) => {
            console.log('Logout failed in useLogout: ', error);
        },
    });

    return { logout, isLoading };
}
