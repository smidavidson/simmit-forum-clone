import { BiSend } from 'react-icons/bi';
import SubmissionContentBox from '../../ui/SubmissionContentBox';
import { useState } from 'react';
import Button from '../../ui/Button';
import { useSubmitComment } from './useSubmitComment';
import { Link } from 'react-router-dom';

export default function CommentSubmissionForm({ postId, user }) {
    // console.log(userId);

    // Implement later (leave as is, for now)
    const [content, setContent] = useState('');
    const { submitComment, isLoading: isSubmittingComment } =
        useSubmitComment();

    function handleSubmit(e) {
        e.preventDefault();
        if (!content) {
            return;
        }

        const commentContent = content;

        submitComment(
            { commentContent, postId },
            {
                onSettled: () => {
                    setContent((cc) => {
                        return '';
                    });
                },
            },
        );
    }

    return (
        <div>
            <form
                className='mb-6'
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <div>
                    <SubmissionContentBox
                        placeholder={
                            user?.id
                                ? 'Add a comment'
                                : 'Login to leave a comment'
                        }
                        className='rounded-lg'
                        value={content}
                        disabled={isSubmittingComment || !user?.username}
                        onChange={(e) => {
                            setContent((cc) => {
                                return e.target.value;
                            });
                        }}
                    ></SubmissionContentBox>
                </div>
                <div>
                    <Button
                        disabled={isSubmittingComment || !user?.username}
                        variant='small'
                    >
                        Comment<BiSend></BiSend>
                    </Button>
                </div>
            </form>
        </div>
    );
}
