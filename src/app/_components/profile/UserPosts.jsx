import { getUserPostsById } from "@/app/_lib/services";
import { notFound } from "next/navigation";
import PostsContainer from "../posts/PostsContainer";

async function UserPosts({ id }) {
  const posts = await getUserPostsById(id, false);
  if(posts ==null) return notFound()
  return <PostsContainer posts={posts} />;
}

export default UserPosts;
