import PostsTable from './PostsTable';
import Pagination from '../../ui/Pagination';
import { ClipLoader } from 'react-spinners';

export function PostsDisplay({ posts, count, isLoadingPosts, error }) {
    if (isLoadingPosts) {
        return (
            <div className='flex items-center justify-center py-8'>
                <div className='mx-auto flex max-w-4xl flex-col items-center space-y-2 px-4 py-2'>
                    <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
                    <p className='text-sm text-gray-600'>Loading posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex h-64 items-center justify-center'>
                <div className='space-y-2 text-center'>
                    <p className='text-lg font-semibold text-gray-800'>
                        Failed to load posts. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className='flex h-64 items-center justify-center'>
                <div className='space-y-2 text-center'>
                    <p className='text-lg font-semibold text-gray-800'>
                        No posts found
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <PostsTable posts={posts} />
            <Pagination count={count} />
        </>
    );
}
