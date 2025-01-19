import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

export default function Header() {
    const { user, profile, isLoading } = useUser();

    // Debug, check that it exists
    console.log(user?.id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Simmit
            <div>
                <Link to={'/submit'}>Submit a Post</Link>
            </div>
            <div>
                {user ? (
                    <div>{profile?.username}</div>
                ) : (
                    <Link to={'/login'}>Login</Link>
                )}
            </div>
        </div>
    );
}
