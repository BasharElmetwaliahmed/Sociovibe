import FollowersFollowingContainer from '@/app/_components/FollowersFollowingContainer';
import { auth } from '@/app/_lib/auth';
import { getFollowers } from '@/app/_lib/services';
import { UserIcon } from '@heroicons/react/24/solid';

async function Page({params}) {
  const session = await auth();
  const following = session.user.following;
  const followers = await getFollowers(params.userId,true);
  

  return (
    <FollowersFollowingContainer
      items={followers}
      icon={<UserIcon />}
      following={following}
      label={"Followers"}
    />
  );

}

export default Page