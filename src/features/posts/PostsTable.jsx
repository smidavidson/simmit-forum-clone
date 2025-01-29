import PostItem from './PostItem';

export default function PostsTable({ posts }) {
    return (
        <div className='flex flex-col gap-2'>
            {posts.map((post) => {
                return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </div>
    );
}
