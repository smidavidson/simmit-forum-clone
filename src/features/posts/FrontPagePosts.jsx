import Pagination from '../../ui/Pagination';
import TableOperations from '../../ui/TableOperations';
import { useFlairs } from '../submit/useFlairs';
import PostsTable from './PostsTable';
import { usePosts } from './usePosts';

export default function FrontPagePosts() {
    const { posts, isLoadingPosts, count } = usePosts();
    const { flairs, isLoadingFlairs } = useFlairs();

    if (isLoadingPosts || isLoadingFlairs) {
        return (
            <div className='flex items-center justify-center'>
                <div className='mx-auto max-w-4xl space-y-2 px-4 py-2'>
                    Loading Posts...
                </div>
            </div>
        );
    }

    // console.log("FrontPagePosts.jsx loaded posts: ", posts);

    return (
        <div className='mx-auto max-w-4xl space-y-2 px-4 py-2'>
            <div>
                <TableOperations>
                    <TableOperations.Item
                        filterField='sort'
                        options={[
                            { id: 'new', name: 'new' },
                            { id: 'old', name: 'old' },
                        ]}
                    >
                        {'Sort: '}
                    </TableOperations.Item>
                    <TableOperations.Item
                        filterField='filter'
                        options={flairs}
                        defaultValue='None'
                    >
                        {'Filter: '}
                    </TableOperations.Item>
                </TableOperations>
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
