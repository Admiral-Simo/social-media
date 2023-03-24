import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MessageIcon from "@mui/icons-material/Message";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext } from "react";
import moment from "moment";
import {
  useCountPostEditsQuery,
  useDeletePostMutation,
  useGetCommentersQuery,
  useGetLikesQuery,
  useToggleLikeMutation,
} from "../../redux/api/apiSlice";
import useToggle from "../../hooks/useToggle";
import { AuthContext } from "../../context/authContext";
import UpdatePost from "../updatePost/UpdatePost";

const Post = ({ id, name, userid, profilePic, createdAt, desc, img }) => {
  const { currentUser } = useContext(AuthContext);

  // Toggles
  const [commentOpen, toggleCommentOpen] = useToggle(false);
  const [updatePostOpen, toggleUpdatePostOpen] = useToggle(false);
  const [menuOpen, toggleMenuOpen] = useToggle(false);

  const [toggleLike] = useToggleLikeMutation();
  const [deletePost] = useDeletePostMutation();
  const { data: editCount } = useCountPostEditsQuery(id);
  const { data: likes } = useGetLikesQuery(id);

  const { data: comments } = useGetCommentersQuery(id);

  let liked = likes?.includes(currentUser.id);

  let commented = comments?.includes(currentUser.id);

  const likeAmount = likes?.length || 0;

  const commentAmount = comments?.length || 0;

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
          <div className="space-x-1 relative">
            <EditIcon
              onClick={toggleUpdatePostOpen}
              className="border-2 cursor-pointer hover:text-sky-500 hover:border-sky-500 border-transparent rounded-lg"
            />

            <MoreHorizIcon
              className="border-2 cursor-pointer hover:text-sky-500 hover:border-sky-500 border-transparent rounded-lg"
              onClick={toggleMenuOpen}
            />
            
            <div className="absolute">
              {editCount ? (
                <span className="text-yellow-500 text-sm font-bold uppercase">{`edited ${editCount} time`}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          {menuOpen && userid === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{desc}</p>
          <img src={img} alt="" />
        </div>
        <div className="info">
          <div
            className={`item ${liked && "text-red-500"}`}
            onClick={handleToggleLike}
          >
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {likeAmount} Likes
          </div>
          <div
            className={`item ${commented && "text-sky-500"}`}
            onClick={toggleCommentOpen}
          >
            {commented ? <MessageIcon /> : <MessageIcon />}
            {commentAmount} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={id} />}
        {updatePostOpen && userid === currentUser.id && (
          <UpdatePost
            toggleUpdatePostOpen={toggleUpdatePostOpen}
            id={id}
            name={name}
            userid={userid}
            profilePic={profilePic}
            createdAt={createdAt}
            desc={desc}
            img={img}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
