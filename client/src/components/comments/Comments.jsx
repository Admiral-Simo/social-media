import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../../redux/api/apiSlice";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const [addComment] = useAddCommentMutation();
  const { currentUser } = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState("");

  const { data: comments, isLoading, error } = useGetCommentsQuery(postId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentInput) {
      addComment({ desc: commentInput, postId });
      setCommentInput("");
    }
  };

  return (
    <div className="comments">
      <form onSubmit={handleSubmit} className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
          type="text"
          placeholder="write a comment"
        />
        <button>Send</button>
      </form>
      {error
        ? "error"
        : isLoading
        ? "loading"
        : comments?.map((comment) => <Comment key={comment.id} {...comment} />)}
    </div>
  );
};

export default Comments;
