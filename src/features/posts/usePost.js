// Hook to interact with apiBookings.js

import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../services/apiPosts';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// Retrieve single Post record using Post Id in params URL
export function usePost() {
    const { postId } = useParams();

    const {
        isLoading: isLoadingPost,
        data: post,
        error,
    } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => {
            return getPost(postId);
        },
    });
    if (error) {
        toast.error(error.message);
        console.log('Error fetching posts in usePost: ', error);
    }

    return { isLoadingPost, post };
}
