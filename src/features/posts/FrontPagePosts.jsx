import PostsTable from './PostsTable';
import { usePosts } from './usePosts';

export default function FrontPagePosts() {
    const { posts, isLoading } = usePosts();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(posts);

    return <PostsTable posts={posts}></PostsTable>;
}
