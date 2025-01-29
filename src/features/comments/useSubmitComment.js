import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitComment as submitCommentApi } from '../../services/apiComments';
import { useParams } from 'react-router-dom';

export function useSubmitComment() {
    const queryClient = useQueryClient();
    const { postId } = useParams();

    const { mutate: submitComment, isLoading } = useMutation({
        mutationFn: ({ commentContent, postId }) => {
            return submitCommentApi({ commentContent, postId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            console.log('Comment failed to be submitted: ', error);
        },
    });

    return { submitComment, isLoading };
}
