import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from || '/';

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return loginApi({ email, password });
        },
        onSuccess: (sessionData) => {
            // Cache session data of user with React Query
            queryClient.setQueryData(['user'], sessionData.session.user);
            navigate('/');
            // navigate(from);
        },
        onError: (error) => {
            console.log('Error logging in from useLogin: ', error);
        },
    });

    return { login, isLoading };
}
