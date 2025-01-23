import PostItem from './PostItem';

export default function PostsTable({ posts }) {
    return (
        <div className='mx-auto max-w-4xl space-y-4 px-4'>
            {posts.map((post) => {
                return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </div>
    );
}
