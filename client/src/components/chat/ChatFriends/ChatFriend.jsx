import React from 'react'

const ChatFriend = ({ id, profilePic, name }) => {
    return (
        <div
          className="flex w-full gap-3 px-8 py-5 transition duration-500 cursor-pointer hover:bg-black hover:text-white"
        >
          <img
            className="w-12 h-12 rounded-full"
            src={profilePic}
            alt="profile_picture"
          />
          <div className="flex flex-col items-start justify-between">
              <p className="text-2xl text-center capitalize">{name}</p>
              <p className="text-xs font-thin text-center capitalize">last message: Hello There!</p>
          </div>
        </div>
      );
}

export default ChatFriend