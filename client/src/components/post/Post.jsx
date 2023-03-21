import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import {
  useDeletePostMutation,
  useGetLikesQuery,
  useToggleLikeMutation,
} from "../../redux/api/apiSlice";
import useToggle from "../../hooks/useToggle";
import { AuthContext } from "../../context/authContext";

const Post = ({ id, name, userid, profilePic, createdAt, desc, img }) => {
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, toggleMenuOpen] = useToggle(false);

  const [toggleLike] = useToggleLikeMutation();
  const [deletePost] = useDeletePostMutation();
  const { data: likes } = useGetLikesQuery(id);

  let liked = likes?.includes(currentUser.id);

  const likeAmount = likes?.length || 0;

  const handleToggleLike = () => {
    toggleLike({ postId: id });
  };

  const handleDelete = () => {
    deletePost({ postId: id });
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${userid}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{name}</span>
              </Link>
              <span className="date">
                {createdAt ? moment(createdAt).fromNow() : "unknown"}
              </span>
            </div>
          </div>
          <MoreHorizIcon
            onClick={toggleMenuOpen}
            style={{ cursor: "pointer" }}
          />
          {menuOpen && userid === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{desc}</p>
          <img src={img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleToggleLike}>
            {liked ? (
              <FavoriteOutlinedIcon style={{ color: "#e6438f" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {likeAmount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen((prev) => !prev)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={id} />}
      </div>
    </div>
  );
};

export default Post;
