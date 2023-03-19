import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../../redux/api/apiSlice";
import moment from "moment";

const Comments = ({ postId }) => {
  const [addComment] = useAddCommentMutation();
  const { currentUser } = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState("");
  //Temporary
  const { data: comments, isLoading, error } = useGetCommentsQuery(postId);

  const handleClick = () => {
    if (commentInput) {
      addComment({ desc: commentInput, postId });
      setCommentInput("");
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          onChange={(e) => setCommentInput(e.target.value)}
          type="text"
          placeholder="write a comment"
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading"
        : comments?.map((comment) => (
            <div key={comment.id} className="comment">
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <span>{comment.desc}</span>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
