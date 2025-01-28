import { useNavigate, useParams } from 'react-router-dom';
import { useProfilePosts } from './useProfilePosts';
import PostsTable from '../posts/PostsTable';
import CommentsTable from '../comments/CommentsTable';
import Pagination from '../../ui/Pagination';
import { useState } from 'react';
import Button from '../../ui/Button';
import { useProfileComments } from './useProfileComments';

export default function Profile() {
    // Get tab from username parameter
    const { username, tab = 'posts' } = useParams();
    const navigate = useNavigate();

    console.log('Username from params: ', username);
    const {
        userPosts = [],
        isLoadingUserPosts,
        count: postsCount,
    } = useProfilePosts({ username, enabled: tab === 'posts' });

    const {
        userComments = [],
        isLoadingUserComments,
        count: commentsCount,
    } = useProfileComments({ username, enabled: tab === 'comments' });

    let isLoadingPostsComments;
    if (tab === 'posts') {
        isLoadingPostsComments = isLoadingUserPosts;
    } else {
        isLoadingPostsComments = isLoadingUserComments;
    }

    if (isLoadingPostsComments) {
        return <div>Loading...</div>;
    }

    // console.log('userComments: ', userComments);
    // console.log(`userPosts: `, userPosts);

    const historyTabs = [
        { name: 'Posts', value: 'posts' },
        { name: 'Comments', value: 'comments' },
    ];

    return (
        <div>
            <div className='mx-auto max-w-4xl space-y-4 px-4'>
                <div className='pb-5 pt-3 text-xl font-semibold'>
                    <span>User: </span>
                    <span>{username}</span>
                </div>
                <div className='flex items-center'>
                    {historyTabs.map((currentTab) => {
                        return (
                            <Button
                                variant='tab'
                                className={`flex w-24 justify-center px-2 py-1 ${tab === currentTab.value ? `border border-b-4 border-gray-200 border-b-blue-500 font-medium` : `text-gray-400`}`}
                                key={currentTab.value}
                                onClick={() => {
                                    navigate(
                                        `/user/${username}/${currentTab.value}`,
                                    );
                                }}
                            >
                                <span>{currentTab.name}</span>
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div>
                {tab === 'posts' ? (
                    <div>
                        <PostsTable posts={userPosts}></PostsTable>
                        <Pagination count={postsCount}></Pagination>
                    </div>
                ) : (
                    <div>
                        <CommentsTable
                            className='mx-auto max-w-4xl px-4'
                            commentsForPost={userComments}
                            isPreview={true}
                        ></CommentsTable>
                        <Pagination count={commentsCount}></Pagination>
                    </div>
                )}
            </div>
            <div></div>
        </div>
    );
}
