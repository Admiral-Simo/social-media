import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../redux/api/apiSlice";
import { selectSearch } from "../../redux/features/searchSlice";
import Post from "../post/Post";
import "./posts.scss";

const Posts = ({userId}) => {
  const searchInput = useSelector(selectSearch);
  const { isLoading, error, data: posts } = useGetPostsQuery({userId, searchInput});

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading..."
        : posts?.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

export default Posts;
