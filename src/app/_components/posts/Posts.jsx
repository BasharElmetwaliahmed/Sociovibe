import { getPosts } from "@/app/_lib/services";
import Post from "./Post";

async function Posts() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col gap-4 ">
      {
        posts.map((post) => <Post post={post} key={post.id} />)
      }
    </div>
  );
}

export default Posts;
