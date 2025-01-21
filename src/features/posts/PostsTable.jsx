import PostItem from './PostItem';

export default function PostsTable({ posts }) {
    return (
        <div className='max-w-4xl mx-auto space-y-4 px-4'>
            {posts.map((post) => {
                return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </div>
    );
}
