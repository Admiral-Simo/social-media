import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
  useUpdateUserMutation,
  useUploadImageMutation,
} from "../../redux/api/apiSlice";
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
      Update
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        <input
          type="text"
          name="name"
          value={texts.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          value={texts.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          value={texts.website}
          onChange={handleChange}
        />
        <button>Update</button>
      </form>
      <button onClick={toggleOpenUpdate}>X</button>
    </div>
  );
};

export default Update;
