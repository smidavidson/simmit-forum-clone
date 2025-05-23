import Pagination from '../../ui/Pagination';
import TableOperations from '../../ui/TableOperations';
import { useFlairs } from '../submit/useFlairs';
import PostsTable from './PostsTable';
import { usePosts } from './usePosts';
import { ClipLoader } from 'react-spinners';

export default function FrontPagePosts() {
    const { posts, isLoadingPosts, count } = usePosts();
    const { flairs, isLoadingFlairs } = useFlairs();

    if (isLoadingPosts || isLoadingFlairs) {
        return (
            <div className='flex items-center justify-center'>
                <div className='mx-auto flex max-w-4xl flex-col items-center space-y-2 px-4 py-2'>
                    <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
                    <p className='text-sm text-gray-600'>Loading posts...</p>
                </div>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className='flex h-64 items-center justify-center'>
                <div className='space-y-2 text-center'>
                    <p className='text-lg font-semibold text-gray-800'>
                        Posts unavailable
                    </p>
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
