import { usePosts } from './usePosts';
import { PostsFilter } from './PostsFilter';
import { PostsDisplay } from './PostsDisplay';

export default function FrontPagePosts() {
    const { posts, isLoadingPosts, count, error } = usePosts();

    return (
        <div className='mx-auto max-w-4xl space-y-4 px-4 py-2'>
            <PostsFilter />
            <PostsDisplay
                posts={posts}
                count={count}
                isLoadingPosts={isLoadingPosts}
                error={error}
            />
        </div>
    );
}
