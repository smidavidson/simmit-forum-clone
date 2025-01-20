import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubmitForm() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();

    function handleSubmit() {
        console.log('submit');
    }

    return (
        <div>
            Submit Form for New Post
            <div>
                <form
                    onSubmit={() => {
                        handleSubmit();
                    }}
                >
                    <div>
                        <label>Title: </label>
                        <input></input>
                    </div>
                    <div>
                        <label>Content: </label>
                        <input></input>
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
