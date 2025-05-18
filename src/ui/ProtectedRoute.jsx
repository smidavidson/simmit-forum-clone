import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // Check if user is auth (logged in) and retrieve user: {username and user_id}
    const { user, isLoading, error } = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login', {
                replace: true,
                // state: {from: location.pathname}
                // We can save the route we tried to access so after logging in, we are directed to it
            });
        }
    }, [isLoading, user, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If user and profile retrieved than return protected route
    if (user) {
        return children;
    }

    return null;
}
