import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
  useUpdateUserMutation,
  useUploadImageMutation,
} from "../../redux/api/apiSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./update.scss";

const Update = ({
  toggleOpenUpdate,
  name,
  city,
  website,
  coverPic,
  profilePic,
}) => {
  const [uploadImage] = useUploadImageMutation();
  const [updateUser] = useUpdateUserMutation();
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [texts, setTexts] = useState({
    name: name ? name : "",
    city: city ? city : "",
    website: website ? website : "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await uploadImage(formData);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  console.log(texts);

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (texts.name && texts.city && texts.website) {
      let coverUrl = coverPic ? coverPic : "";
      let profileUrl = profilePic ? profilePic : "";

      cover && (coverUrl = await upload(cover));
      profile && (profileUrl = await upload(profile));

      updateUser({ ...texts, coverPic: coverUrl, profilePic: profileUrl }).then(
        () => {
          setCurrentUser({
            id: currentUser.id,
            ...texts,

            coverPic: coverUrl,
            profilePic: profileUrl,
          });
        }
      );
      toggleOpenUpdate();
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={cover ? URL.createObjectURL(cover) : coverPic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={profile ? URL.createObjectURL(profile) : profilePic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button>Update</button>
        </form>
        <button className="close" onClick={toggleOpenUpdate}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
