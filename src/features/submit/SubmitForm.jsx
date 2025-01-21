import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubmitPost from './useSubmitPost';

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
            Submit Form for New Post
            <div>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div>
                        <label>Title: {title}</label>
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
                        <label>Content: {content}</label>
                        <input
                            value={content}
                            onChange={(e) => {
                                setContent((cc) => {
                                    return e.target.value;
                                });
                            }}
                        ></input>
                    </div>
                    <button>Submit Post</button>
                </form>

                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );
}
