import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updatePost as updatePostApi } from '../../services/apiPosts';

export function useUpdatePost() {
    const queryClient = useQueryClient();

    const { mutate: updatePost, isLoading: isUpdatingPost } = useMutation({
        mutationFn: (postId) => updatePostApi(postId),
        onSuccess: (_data, postId) => {
            toast.success('Post successfully deleted');
            console.log('Invalidating queries for post', postId);
            // Invalidate the post we just deleted
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
            // Invalidate front page posts
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    return { isUpdatingPost, updatePost };
}
