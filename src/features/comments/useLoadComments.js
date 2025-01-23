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
            return getCommentsFromPostId(postId);
        },
    });
    if (error) {
        console.log('Error fetching posts in useComments: ', error);
    }

    return { isLoading, commentsForPost };
}
