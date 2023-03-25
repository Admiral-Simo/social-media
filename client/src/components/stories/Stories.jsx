import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
  useAddStoryMutation,
  useGetStoriesQuery,
  useUploadImageMutation,
} from "../../redux/api/apiSlice";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [storyImg, setStoryImg] = useState(null);

  const [uploadImage] = useUploadImageMutation();
  const [addStory] = useAddStoryMutation();
  const { data: stories } = useGetStoriesQuery();

  const handleShowStory = (id) => {
    const story = stories.filter((story) => id === story.id);

    // todo show story for as little as 10seconds per story
  };

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

  const handleAddStory = async () => {
    if (storyImg) {
      const storyUrl = await upload(storyImg);
      addStory({ storyUrl });
    }
  };

  return (
    <div className="flex gap-3 mb-10 overflow-x-scroll w-full max-w-5xl scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
      <div className="relative shrink-0 w-40 h-60 md:w-60 md:h-96 rounded-lg overflow-hidden">
        <button
          onClick={handleAddStory}
          className="absolute cursor-pointer bottom-12 text-white left-2 bg-sky-500 rounded-full p-2 z-10"
        >
          <AddIcon />
        </button>

        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => setStoryImg(e.target.files[0])}
        />
        <img
          src={
            storyImg ? URL.createObjectURL(storyImg) : currentUser.profilePic
          }
          className="h-full object-cover"
          alt="profilePic"
        />
        <label htmlFor="file">
          <div className="w-full h-full bg-white absolute top-0 left-0 opacity-40 cursor-pointer" />
        </label>
        <span className="absolute text-black bottom-4 left-2 font-bold z-10">
          {currentUser.name}
        </span>
      </div>
      {stories?.map(({ id, name, img, createdAt }) => (
        <div
          key={id}
          className="relative shrink-0 w-40 h-60 md:w-60 md:h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleShowStory(id)}
        >
          <span className="absolute text-black top-4 right-2 z-10">
            {createdAt ? moment(createdAt).fromNow() : "unknown"}
          </span>
          <div className="w-full h-full bg-white absolute top-0 left-0 opacity-40" />
          <img src={img} className="w-full h-full object-cover" alt="" />
          <span className="absolute text-black bottom-4 left-2 font-bold z-10 capitalize">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
