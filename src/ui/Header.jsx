import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import {
    BiBell,
    BiEdit,
    BiLogOut,
    BiPen,
    BiPencil,
    BiPlusCircle,
    BiSolidLogIn,
    BiSolidLogOut,
} from 'react-icons/bi';
import useLogout from '../features/authentication/useLogout';

export default function Header() {
    const { user, profile, isLoading } = useUser();
    const { logout, isLoading: isLoggingOut } = useLogout();

    // Debug, check that it exists
    console.log(user?.id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <header className='border-b bg-white'>
            <div className='px-4 py-4'>
                <div className='flex items-center justify-between'>
                    <Link to={'/'} className='text-lg font-semibold'>
                        Simmit
                    </Link>

                    <nav className='flex items-center gap-6'>
                        <Link
                            to={'/submit'}
                            className='flex items-center gap-1'
                        >
                            <BiPlusCircle></BiPlusCircle> Submit Post
                        </Link>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : user ? (
                            <>
                                <Link>
                                    <BiBell></BiBell>
                                </Link>
                                <Link to={`/user/${profile?.username}`}>
                                    {profile?.username}
                                </Link>
                                <button
                                    className='flex items-center gap-1'
                                    onClick={() => {
                                        logout();
                                    }}
                                    disabled={isLoggingOut}
                                >
                                    Logout<BiLogOut></BiLogOut>
                                </button>
                            </>
                        ) : (
                            <Link
                                to={'/login'}
                                className='flex items-center gap-1'
                            >
                                Login<BiSolidLogIn></BiSolidLogIn>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
