import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
    return (
        <div>
            {post.title} by <Link to={`/user/${post.profiles.username}`}>{post.profiles.username}</Link> X hours ago
            <Link to={`${post.id}`}> View Post</Link>
        </div>
    );
}
