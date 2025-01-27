import { useQuery } from '@tanstack/react-query';
import { getCommentsFromPostId } from '../../services/apiComments';

export function useLoadComments(postId) {
    const {
        isLoading,
        data: commentsForPost,
        error,
    } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => {
            console.log('Fetching comments for postId:', postId); // Add this

            return getCommentsFromPostId(postId);
        },
        staleTime: 0, // Add this to ensure immediate refetch
        cacheTime: 0,
    });
    if (error) {
        console.log('Error fetching posts in useComments: ', error);
    }

    return { isLoading, commentsForPost };
}
