import Pagination from '../../ui/Pagination';
import CommentsTable from '../comments/CommentsTable';
import PostsTable from '../posts/PostsTable';

export default function ProfileHistory({
    tab,
    userPosts,
    userComments,
    postsCount,
    commentsCount,
}) {
    console.log('userPosts: ', userPosts);

    return (
        <div>
            {tab === 'posts' ? (
                <div className='space-y-2'>
                    
                    <PostsTable posts={userPosts}></PostsTable>
                    <Pagination count={postsCount}></Pagination>
                </div>
            ) : (
                <div className='space-y-2'>
                    <CommentsTable
                        commentsForPost={userComments}
                        isPreview={true}
                    ></CommentsTable>
                    <Pagination count={commentsCount}></Pagination>
                </div>
            )}
        </div>
    );
}
