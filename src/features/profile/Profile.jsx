import { useParams } from 'react-router-dom';
import { useProfilePosts } from './useProfilePosts';
import PostsTable from '../posts/PostsTable';
import Pagination from '../../ui/Pagination';
import { useState } from 'react';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('posts');

    const { username } = useParams();
    // console.log('Username from params: ', username);
    const { userPosts, isLoadingUserPosts, count: postsCount } = useProfilePosts({ username });

    if (isLoadingUserPosts) {
        return <div>Loading...</div>;
    }

    console.log(`User posts: `, userPosts);

    return (
        <div>
            <div>User: {username}</div>
            <div>
                <div>Submissions and comments: </div>
                <PostsTable posts={userPosts}></PostsTable>
            </div>
            <div>
                <Pagination count={postsCount}></Pagination>
            </div>
        </div>
    );
}
