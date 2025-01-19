import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            Header <Link to={'/submit'}>Submit a Post</Link>{' '}
            <Link to={'/login'}>Login</Link>
        </div>
    );
}
