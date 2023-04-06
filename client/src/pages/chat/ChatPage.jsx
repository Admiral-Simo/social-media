import "./chatpage.scss";
import React, { useContext } from "react";
import ChatBody from "../../components/chat/ChatBody/ChatBody";
import ChatFiles from "../../components/chat/ChatFiles";
import ChatFriends from "../../components/chat/ChatFriends/ChatFriends";
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
      </div>
    </div>
  );
};

export default ChatPage;
