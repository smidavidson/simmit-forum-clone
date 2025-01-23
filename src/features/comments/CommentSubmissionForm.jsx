import { BiSend } from "react-icons/bi";

export default function CommentSubmissionForm({postTitle}) {
    return (
        <form>
            <div>
                <label>Comment On Post:</label>
                <textarea></textarea>
            </div>
            <div>
                <button>Submit Comment<BiSend></BiSend></button>
            </div>
        </form>
    );
}
