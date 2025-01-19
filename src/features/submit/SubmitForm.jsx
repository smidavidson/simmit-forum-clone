import { useNavigate } from 'react-router-dom';

export default function SubmitForm() {
    const navigate = useNavigate();

    return (
        <div>
            Submit new post
            <div>
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
