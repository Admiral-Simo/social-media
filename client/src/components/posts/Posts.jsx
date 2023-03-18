import { useGetPostsQuery } from "../../redux/api/apiSlice";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const { isLoading, error, data: posts } = useGetPostsQuery();

  error && console.log(error);

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
