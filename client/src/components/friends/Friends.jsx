import React from "react";
import { useGetFollowedUserQuery } from "../../redux/api/apiSlice";
import Friend from "./Friend";
import './friends.scss'

const Friends = () => {
  const { data: friends, isLoading } = useGetFollowedUserQuery();

  console.log(friends)

  return (
    <div className="p-4 friends">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? "loading"
          : friends?.map((friend) => <Friend key={friend.id} {...friend} />)}
        {!isLoading && (friends?.length === 0) && <h1 className="text-5xl font-bold">you have no friends</h1>}
      </div>
    </div>
  );
};

export default Friends;
