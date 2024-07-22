import { Suspense } from "react";
import FollowersPostsSkeleton from "./FollowersPostsSkeleton";
import PostsFollowersSec from "./PostsFollowersSec";
import ProfileHeader from "./ProfileHeader";

function Profile({ user }) {
  return (
    <div className="w-full flex justify-center text-white">
      <div className="w-full md:max-w-[488px] flex flex-col items-center ">
        <div className=" bg-blue h-[131px] w-full md:rounded-b-[40px] "></div>
        <div className="w-full">
          <ProfileHeader user={user} />
          <Suspense fallback={<FollowersPostsSkeleton />}>
            <PostsFollowersSec userId={user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Profile;
