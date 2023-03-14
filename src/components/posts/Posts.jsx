import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "Jane Doe",
      userId: 2,
      profilePic:
        "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://scontent.frak3-1.fna.fbcdn.net/v/t39.30808-6/328506040_517381087233646_9199714303533330775_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=5cd70e&_nc_eui2=AeEKLGdPaAxzBtUH5tcWxJpnQLf8jaO_BYtAt_yNo78Fi4etrhsYtj3NjdaEzAYNn-fbvGYV3R4jFI-Snsmxq0pP&_nc_ohc=Xsi1owsiyeMAX8JaEbm&_nc_ht=scontent.frak3-1.fna&oh=00_AfDYGO67I5FtDq81CEGUv_XDqgx78ikxvC9PoFG9yi_oMA&oe=6414E119",
    },
  ];
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
