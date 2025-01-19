import PostsTable from '../features/posts/PostsTable';

export default function FrontPage() {
    return (
        <div>
            <div>Filter by:</div>
            <PostsTable></PostsTable>
        </div>
    );
}
