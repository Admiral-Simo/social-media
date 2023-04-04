import { useGetFollowedUserQuery } from "../../../redux/api/apiSlice";
import ChatFriend from "./ChatFriend";

const ChatFriends = () => {
  const { data: friends, isLoading } = useGetFollowedUserQuery();
  return (
    <div className='flex-col hidden p-2 md:flex side1'>
      {isLoading
          ? "loading"
          : friends?.map((friend) => <ChatFriend key={friend.id} {...friend} />)}
        {!isLoading && (friends?.length === 0) && <h1 className="text-5xl font-bold">you have no friends</h1>}
    </div>
  )
}

export default ChatFriends