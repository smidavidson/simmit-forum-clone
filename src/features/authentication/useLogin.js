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
        onSuccess: (sessionData) => {
            queryClient.setQueryData(['user'], sessionData.session.data);
            navigate('/');
        },
        onError: (error) => {
            console.log('Error logging in from useLogin: ', error);
        },
    });

    return { login, isLoading };
}
