import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import {
  useGetPostsQuery,
  useGetRelationshipsQuery,
  useGetUserQuery,
  useToggleRelationshipMutation,
} from "../../redux/api/apiSlice";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import useToggle from "../../hooks/useToggle";

const Profile = () => {
  const [openUpdate, toggleOpenUpdate] = useToggle(false)

  const userId = parseInt(useLocation().pathname.split("/").slice(-1)[0]);

  const [toggleFollow] = useToggleRelationshipMutation();

  const { currentUser } = useContext(AuthContext);

  const { data, isLoading, error } = useGetUserQuery(userId);

  console.log(data)

  const { isLoading: rIsLoading, data: relationships } =
    useGetRelationshipsQuery(userId);

  console.log(relationships);

  const handleFollow = () => {
    toggleFollow({ userId }).then((res) => console.log(res));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data?.coverPic} alt="" className="cover" />
            <img src={data?.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://instagram.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://twitter.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://linkedin.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://pinterest.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data?.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data?.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={toggleOpenUpdate}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationships?.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update toggleOpenUpdate={toggleOpenUpdate} {...data} />}
    </div>
  );
};

export default Profile;
