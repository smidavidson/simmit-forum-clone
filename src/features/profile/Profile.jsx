import { useNavigate, useParams } from 'react-router-dom';
import { useProfilePosts } from './useProfilePosts';
import { useProfileComments } from './useProfileComments';
import ProfileHistory from './ProfileHistory';
import ProfileHistoryTab from './ProfileHistoryTab';

export default function Profile() {
    // Get tab from username parameter
    const { username, tab = 'posts' } = useParams();

    // console.log('Username from params: ', username);
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
        return (
            <div className='flex items-center justify-center'>
                <div>Loading...</div>
            </div>
        );
    }

    // console.log('userComments: ', userComments);
    // console.log(`userPosts: `, userPosts);

    const historyTabs = [
        { name: 'Posts', value: 'posts' },
        { name: 'Comments', value: 'comments' },
    ];

    return (
        <div className='mx-auto max-w-4xl px-4'>
            <div>
                <div className='pb-5 pt-3 text-xl font-semibold'>
                    <span>User: </span>
                    <span>{username}</span>
                </div>
                <div className='flex items-center'>
                    <ProfileHistoryTab
                        historyTabs={historyTabs}
                        tab={tab}
                        username={username}
                    ></ProfileHistoryTab>
                    {/* {historyTabs.map((currentTab) => {
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
                    })} */}
                </div>
            </div>
            <div>
                <ProfileHistory
                    tab={tab}
                    userPosts={userPosts}
                    userComments={userComments}
                    postsCount={postsCount}
                    commentsCount={commentsCount}
                ></ProfileHistory>
            </div>
        </div>
    );
}
