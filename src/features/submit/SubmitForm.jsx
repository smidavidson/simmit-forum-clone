import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubmitPost from './useSubmitPost';
import SubmissionContentBox from '../../ui/SubmissionContentBox';
import { BiSend } from 'react-icons/bi';

export default function SubmitForm() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const navigate = useNavigate();

    const { submitPost, isLoading: isSubmitting } = useSubmitPost();

    function handleSubmit(e) {
        e.preventDefault();

        console.log(`Submit pressed: `, title, content);

        submitPost(
            { title, content },
            {
                onSettled: () => {
                    // Navigate to page of newly submitted post after submission?
                    setTitle((ct) => {
                        return '';
                    });
                    setContent((cc) => {
                        return '';
                    });
                },
            },
        );
    }

    return (
        <div>
            <h2>Create post</h2>
            <div>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div>
                        <label>Title{title}</label>
                        <input
                            value={title}
                            onChange={(e) => {
                                setTitle((ct) => {
                                    return e.target.value;
                                });
                            }}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='post-content'>Body{content}</label>
                        <SubmissionContentBox
                            id='post-content'
                            value={content}
                            onChange={(e) => {
                                setContent((cc) => {
                                    return e.target.value;
                                });
                            }}
                            placeholder='Say something about your post!'
                        ></SubmissionContentBox>
                    </div>
                    <button>
                        Post<BiSend></BiSend>
                    </button>
                </form>
            </div>
        </div>
    );
}
