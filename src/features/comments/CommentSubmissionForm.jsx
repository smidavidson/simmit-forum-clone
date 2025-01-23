import { BiSend } from 'react-icons/bi';
import SubmissionContentBox from '../../ui/SubmissionContentBox';
import { useState } from 'react';
import Button from '../../ui/Button';

export default function CommentSubmissionForm({ postId }) {
    // Implement later (leave as is, for now)
    const [content, setContent] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!content) {
            return;
        }

        console.log('submitted!');
    }

    return (
        <form
        className='mb-6'
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
            <div>
                <SubmissionContentBox
                    placeholder='Add a comment'
                    className="rounded-lg"
                    value={content}
                    onChange={(e) => {
                        setContent((cc) => {
                            return e.target.value;
                        });
                    }}
                ></SubmissionContentBox>
            </div>
            <div>
                <Button>
                    Comment<BiSend></BiSend>
                </Button>
            </div>
        </form>
    );
}
