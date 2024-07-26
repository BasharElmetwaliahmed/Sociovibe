import FollowersFollowingContainer from "@/app/_components/FollowersFollowingContainer";
import { getFollowing } from "@/app/_lib/services";

async function Page({ params }) {
  const following = await getFollowing(params.userId);
  
  return <FollowersFollowingContainer items={following} following={following} label={"Following"} />;
}

export default Page;
