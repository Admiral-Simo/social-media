import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

console.log(socket);

const ChatBody = () => {
  return (
    <div className="flex-[10] h-full p-3">
      {socket.connected && "conntected"}
    </div>
  );
};

export default ChatBody;
