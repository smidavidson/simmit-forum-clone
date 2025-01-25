import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { submitPost as submitPostApi } from '../../services/apiPosts';

export default function useSubmitPost() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: submitPost, isLoading } = useMutation({
        mutationFn: (newPost) => {
            return submitPostApi(newPost);
        },
        onSuccess: (newPost) => {
            queryClient.invalidateQueries(['posts']);
            navigate(`/post/${newPost.id}`);
            // Not sure what to do here
        },
        onError: (error) => {
            console.log('Post failed to be submitted: ', error);
        },
    });

    return { submitPost, isLoading };
}
