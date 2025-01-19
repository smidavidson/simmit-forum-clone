import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
    return (
        <div>
            {post.title} Posted by: {post.profiles.username}
            <Link to={`${post.id}`}>View</Link>
        </div>
    );
}
