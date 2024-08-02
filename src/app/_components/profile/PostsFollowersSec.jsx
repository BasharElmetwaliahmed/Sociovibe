import { getFollowers, getUserPostsById } from "@/app/_lib/services";
import Link from "next/link";
import Follower from "./Follower";
import ProfileFollowers from "./ProfileFollowers";
import ProfilePosts from "./ProfilePosts";

async function PostsFollowersSec({ userId }) {
  const [posts, followers] = await Promise.all([
    getUserPostsById(userId, true),
    getFollowers(userId, true, true),
  ]);
  return (
    <>
      <div className="py-4 px-4 bg-lightDark">
        <div className="flex justify-between">
          <h3 className="font-semibold ">Followers</h3>
          {followers.length > 0 && (
            <button className="text-blue">View All</button>
          )}
        </div>
        <div className="flex gap-4 items-center mt-5 h-[92px]">
          {followers.length === 0 ? (
            <p className="w-full text-center">No followers yet.</p>
          ) : (
            <ProfileFollowers followers={followers} />
          )}
        </div>
      </div>
      <div className="px-4 py-4 mt-4 bg-lightDark">
        <div className="flex justify-between">
          <h3 className="font-semibold ">Posts</h3>
          {posts.length > 0 && (
            <Link href={`/profile/${userId}/posts`} className="text-blue">
              View All
            </Link>
          )}
        </div>
        <div className="flex gap-2 py-2 items-center  w-full h-[94px]  ">
          {posts.length === 0 ? (
            <p className="w-full text-center">No posts yet.</p>
          ) : (
            <ProfilePosts posts={posts} />
          )}
        </div>
      </div>
    </>
  );
}

export default PostsFollowersSec;
