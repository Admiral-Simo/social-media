import moment from "moment";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./updatePost.scss";
import {
  useUpdatePostMutation,
  useUploadImageMutation,
} from "../../redux/api/apiSlice";

const UpdatePost = ({
  id,
  name,
  profilePic,
  createdAt,
  desc,
  img,
  toggleUpdatePostOpen,
}) => {
  const [title, setTitle] = useState(desc);
  const [thumbnail, setThumbnail] = useState(null);

  const [uploadImage] = useUploadImageMutation();
  const [updatePost] = useUpdatePostMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      // Update The Post
      let thumbUrl;
      if (thumbnail) {
        thumbUrl = await upload(thumbnail);
      } else {
        thumbUrl = img;
      }
      updatePost({ title, img: thumbUrl, id }).then(() => {
        toggleUpdatePostOpen();
      });
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <button
          onClick={toggleUpdatePostOpen}
          className="p-2 bg-red-500 absolute right-5 top-5"
        >
          close
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <img
              src={profilePic}
              alt="profilePic"
              className="h-10 w-10 rounded-full mr-3"
            />
            <div className="flex flex-col justify-between">
              <h3 className="font-bold">{name}</h3>
              <h3>{createdAt ? moment(createdAt).fromNow() : "unknown"}</h3>
            </div>
          </div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="thumbnail" className="relative cursor-pointer">
            <img
              src={thumbnail ? URL.createObjectURL(thumbnail) : img}
              alt="thumbnail"
              className="object-cover w-full h-52 opacity-50"
            />
            <CloudUploadIcon className="absolute left-0 right-0 top-0 bottom-0 m-auto text-white scale-110" />
          </label>
          <input
            type="file"
            id="thumbnail"
            className="hidden"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          <button>Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
