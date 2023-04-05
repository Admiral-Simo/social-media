import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../redux/features/currentChatUserSlice";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000", {
  withCredentials: true,
});

const ChatBody = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("receive_message", {
      msg: message,
      receiverid: 3,
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });
  }, []);
  if (!connected) {
    return (
      <div className="flex-[10] h-full p-3 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl">Something went wrong!</h1>
          <img
            src="./Transfer-files-cuate.png"
            alt="illustration"
            className="w-1/2"
          />
        </div>
      </div>
    );
  }
  if (currentUser.id === 0) {
    return (
      <div className="flex-[10] h-full p-3 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl">Choose a user to chat with</h1>
          <img
            src="./Messaging-pana.png"
            alt="illustration"
            className="w-1/2"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex-[10] h-full relative chatBody">
      <div className="flex items-center w-full gap-6 p-2 shadow">
        <img
          className="w-16 h-16 rounded-full"
          src={currentUser.profilePic}
          alt="receiver_profile"
        />
        <div className="flex flex-col items-start justify-between">
          <p className="text-2xl text-center capitalize">{currentUser.name}</p>
          <p className="text-xs font-thin text-center capitalize">
            last message: Hello There!
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 focus:outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="p-3 bg-green-400">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
