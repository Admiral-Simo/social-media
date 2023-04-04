import React from "react";
import { useNavigate } from "react-router-dom";

const Friend = ({ id, profilePic, name }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-8 transition duration-500 rounded-lg cursor-pointer w-fit hover:bg-black hover:text-white"
      onClick={() => navigate(`/profile/${id}`)}
    >
      <img
        className="rounded-full w-52 h-52"
        src={profilePic}
        alt="profile_picture"
      />
      <p className="text-3xl font-bold text-center capitalize">{name}</p>
    </div>
  );
};

export default Friend;
