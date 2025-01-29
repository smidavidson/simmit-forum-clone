import { Link, useSearchParams } from 'react-router-dom';
import { useUserAndProfile } from '../features/authentication/useUserAndProfile';
import {
    BiBell,
    BiEdit,
    BiLogOut,
    BiPen,
    BiPencil,
    BiPlusCircle,
    BiSolidLogIn,
    BiSolidLogOut,
    BiUserCheck,
    BiUserCircle,
} from 'react-icons/bi';
import useLogout from '../features/authentication/useLogout';

export default function Header() {
    const { user, profile, isLoading } = useUserAndProfile();
    const { logout, isLoading: isLoggingOut } = useLogout();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <header className='border-b bg-white'>
            <div className='px-4 py-4'>
                <div className='flex items-center justify-between'>
                    <Link
                        to={'/'}
                        className='text-lg font-semibold'
                    >
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
                                <Link
                                    className='flex flex-wrap items-center gap-1'
                                    to={`/user/${profile?.username}/posts`}
                                >
                                    <BiUserCircle></BiUserCircle>
                                    <span className='hidden ip-se2:inline'>
                                        {profile?.username}
                                    </span>
                                </Link>
                                <button
                                    className='flex items-center gap-1'
                                    onClick={() => {
                                        logout();
                                    }}
                                    disabled={isLoggingOut}
                                >
                                    <span className='hidden ip-se2:inline'>
                                        Logout
                                    </span>
                                    <BiLogOut></BiLogOut>
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
