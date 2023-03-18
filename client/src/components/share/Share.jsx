import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
  useAddPostMutation,
  useUploadImageMutation,
} from "../../redux/api/apiSlice";

const Share = () => {
  const [addPost] = useAddPostMutation();
  const [uploadImage] = useUploadImageMutation();
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  console.log("file", file);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await uploadImage(formData);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const handleClick = async () => {
    if (desc) {
      let imgUrl = null;
      if (file) {imgUrl = await upload();}
      console.log("imgUrl", imgUrl);
      addPost({ desc, img: imgUrl });
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
