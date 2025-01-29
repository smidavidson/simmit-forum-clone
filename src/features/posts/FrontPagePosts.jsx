import Pagination from '../../ui/Pagination';
import TableOperations from '../../ui/TableOperationsSort';
import PostsTable from './PostsTable';
import { usePosts } from './usePosts';

export default function FrontPagePosts() {
    const { posts, isLoadingPosts, count } = usePosts();

    if (isLoadingPosts) {
        return <div>Loading...</div>;
    }

    console.log(posts);

    return (
        <div className='mx-auto max-w-4xl space-y-2 px-4 py-2'>
            <div>
                <TableOperations
                    filterField='sort'
                    options={[
                        { value: 'new', label: 'new' },
                        { value: 'old', label: 'old' },
                    ]}
                ></TableOperations>
            </div>
            <div>
                <PostsTable posts={posts}></PostsTable>
            </div>
            <div>
                <Pagination count={count}></Pagination>
            </div>
        </div>
    );
}
