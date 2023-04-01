import "./chatpage.scss";
import React, { useContext } from "react";
import ChatBody from "../../components/chat/ChatBody";
import ChatFiles from "../../components/chat/ChatFiles";
import ChatFriends from "../../components/chat/ChatFriends";
import Navbar from "../../components/navbar/Navbar";
import { DarkModeContext } from "../../context/darkModeContext";

const ChatPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div className="flex chat">
        <ChatFriends />
        <ChatBody />
        <ChatFiles />
      </div>
    </div>
  );
};

export default ChatPage;
