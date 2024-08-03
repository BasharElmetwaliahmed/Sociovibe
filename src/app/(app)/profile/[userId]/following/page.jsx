import FollowersFollowingContainer from "@/app/_components/FollowersFollowingContainer";
import { getFollowing } from "@/app/_lib/services";
import { UserIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Following",
};
async function Page({ params }) {
  const following = await getFollowing(params.userId);
  if (following == null) return notFound();

  return (
    <FollowersFollowingContainer
      items={following}
      icon={<UserIcon />}
      following={following}
      label={"Following"}
    />
  );
}

export default Page;
