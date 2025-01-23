import { useParams } from 'react-router-dom';
import { useProfile } from './useProfile';
import PostsTable from '../posts/PostsTable';

export default function Profile() {
    const { username } = useParams();
    console.log('params: ', username);
    const { userPosts, isLoading: isUserPostsLoading } = useProfile(username);

    console.log(`User posts: `, userPosts);

    if (isUserPostsLoading) {
        return <div>Loading...</div>
    }

    return <div>
        <div>User: {username}</div>
        <div><div>Submissions and comments: </div><PostsTable posts={userPosts}></PostsTable></div>
    </div>;
}
