import PostItem from './PostItem';

export default function PostsTable({ posts }) {
    return (
        <div>
            {posts.map((post) => {
                return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </div>
    );
}
