import FollowersFollowingContainer from "@/app/_components/FollowersFollowingContainer";
import { getFollowing } from "@/app/_lib/services";
import {  UserIcon } from "@heroicons/react/24/solid";

async function Page({ params }) {
  const following = await getFollowing(params.userId);
  
  return <FollowersFollowingContainer items={following} icon={<UserIcon/>} following={following} label={"Following"} />;
}

export default Page;
