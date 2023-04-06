import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import moment from "moment";

const Message = ({
  id,
  userid,
  senderid,
  receiverid,
  msg,
  createdAt,
  name,
  profilePic,
}) => {
  const { currentUser } = useContext(AuthContext);
  const isMe = userid === currentUser.id;
  console.log(isMe, msg);
  return (
    <div className={`p-4 ${isMe ? "bg-sky-500" : "bg-gray-400"} flex items-center gap-5`}>
        <img src={profilePic} className="object-cover w-16 h-16 rounded-full" alt="" />
      <div>
          <h1 className="font-semibold">{msg}</h1>
          <p className="font-thin">{createdAt ? moment(createdAt).fromNow() : "unknown"}</p>
      </div>
    </div>
  );
};

export default Message;
