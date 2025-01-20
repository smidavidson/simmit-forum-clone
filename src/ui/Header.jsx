import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { BiPlusCircle, BiSolidLogIn, BiSolidLogOut } from 'react-icons/bi';

export default function Header() {
    const { user, profile, isLoading } = useUser();

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
                                <div>{profile?.username}</div>
                                <Link className='flex items-center gap-1'>
                                    Logout<BiSolidLogOut></BiSolidLogOut>
                                </Link>
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
