import PostItem from './PostItem';
import { usePosts } from './usePosts';

export default function PostsTable() {
    const { posts, isLoading } = usePosts();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(posts);

    return (
        <div>
            {posts.map((post) => {
                return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </div>
    );
}
