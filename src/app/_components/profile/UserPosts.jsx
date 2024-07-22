import { getUserPostsById } from "@/app/_lib/services";
import PostsContainer from "../posts/PostsContainer";

async function UserPosts({ id }) {
  const posts = await getUserPostsById(id, false);
  return <PostsContainer posts={posts} />;
}

export default UserPosts;
