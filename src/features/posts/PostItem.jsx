import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
    return (
        <div>
            {post.title} by {post.profiles.username} X hours ago
            <Link to={`${post.id}`}> View Post</Link>
        </div>
    );
}
