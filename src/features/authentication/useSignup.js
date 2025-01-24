import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signup as signUpApi } from '../../services/apiAuth';

export default function useSignup() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: signup, isLoading } = useMutation({
        mutationFn: ({ username, email, password }) => {
            return signUpApi({ username, email, password });
        },
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/', { replace: true });
        },
        onError: (error) => {
            console.log('Signup failed in useSignup: ', error);
            throw error;
        },
    });

    return { signup, isLoading };
}
