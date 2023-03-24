import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useToggle from "../../hooks/useToggle";
import {
  useCountCommentEditsQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/api/apiSlice";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

function Comment({ id, name, desc, createdAt, profilePic, userid }) {
  // toggles
  const [showMore, toggleShowMore] = useToggle();
  const [isEditing, setIsEditing] = useState(false);
  const [commentDesc, setCommentDesc] = useState(desc);
  // api
  const { data: editCount } = useCountCommentEditsQuery(id);
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  // context
  const { currentUser } = useContext(AuthContext);

  const handleDelete = () => {
    deleteComment({ id });
  };

  const handleSave = () => {
    if (commentDesc) {
      updateComment({ id, desc: commentDesc });
      setIsEditing(false);
      toggleShowMore();
    }
  };

  return (
    <div className="comment">
      <img src={profilePic} alt="" />

      <div className="info">
        <span>{name}</span>
        {!isEditing ? (
          <p className="font-thin">{desc}</p>
        ) : (
          <input
            value={commentDesc}
            className="bg-transparent font-semibold border-b-2 focus:outline-none focus:border-b-orange-300 w-full py-1"
            onChange={(e) => setCommentDesc(e.target.value)}
          />
        )}
      </div>
      <span className="date relative">
        {moment(createdAt).fromNow()}
        <MoreVertIcon
          onClick={() => {
            toggleShowMore();
            isEditing && setIsEditing(false);
          }}
          className="cursor-pointer"
        />
        <br />
        {editCount && !showMore ? <span className="text-yellow-500 font-bold uppercase">{`edited ${editCount} time`}</span> : ""}
        {showMore && currentUser.id === userid && (
          <div className="absolute top-6 left-0 space-x-1">
            {!isEditing ? (
              <>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 p-2 text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-sky-500 p-2 text-white"
                >
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={handleSave}
                type="submit"
                className="bg-sky-500 p-2 absolute text-white"
              >
                Save
              </button>
            )}
          </div>
        )}
      </span>
    </div>
  );
}

export default Comment;
