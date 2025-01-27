import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateComment as updateCommentApi } from '../../services/apiComments';
import { useParams } from 'react-router-dom';

export function useUpdateComment() {
    const queryClient = useQueryClient();
    const { postId } = useParams();

    const { mutate: updateComment, isLoading: isUpdatingComment } = useMutation(
        {
            mutationFn: (commentId) => updateCommentApi(commentId),
            onSuccess: () => {
                console.log('Invalidating comments for postId:', postId);

                toast.success('Comment successfully updated');
                // Invalidate the post we just deleted
                queryClient.invalidateQueries({
                    queryKey: ['comments', postId],
                });
                // Invalidate front page posts
                queryClient.invalidateQueries({ queryKey: ['posts'] });
            },
        },
    );

    return { isUpdatingComment, updateComment };
}
