import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return loginApi({ email, password });
        },
        onSuccess: ({ user }) => {
            // Cache session data of user with React Query
            queryClient.setQueryData(['user'], { user });
            navigate('/');
            // navigate(from);
        },
        onError: (error) => {
            console.log('Error logging in from useLogin: ', error);
        },
    });

    return { login, isLoading };
}
