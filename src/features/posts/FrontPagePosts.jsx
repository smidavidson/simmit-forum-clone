import Pagination from '../../ui/Pagination';
import PostsTable from './PostsTable';
import { usePosts } from './usePosts';

export default function FrontPagePosts() {
    const { posts, isLoadingPosts, count } = usePosts();

    if (isLoadingPosts) {
        return <div>Loading...</div>;
    }

    console.log(posts);

    return (
        <div>
            <div>
                <PostsTable posts={posts}></PostsTable>
            </div>
            <div>
                <Pagination count={count}></Pagination>
            </div>
        </div>
    );
}
