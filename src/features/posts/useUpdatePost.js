import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updatePost as updatePostApi } from '../../services/apiPosts';

export function useUpdatePost() {
    const queryClient = useQueryClient();

    const { mutate: updatePost, isLoading: isUpdatingPost } = useMutation({
        mutationFn: (postId) => updatePostApi(postId),
        onSuccess: (postId) => {
            toast.success('Post successfully updated');
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
    });

    return { isUpdatingPost, updatePost };
}
