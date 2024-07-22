import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import FollowersPostsSkeleton from "./FollowersPostsSkeleton";
function ProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#15202B" highlightColor="#1C2938">
      <div className="w-full flex justify-center text-white">
        <div className="w-full md:max-w-[488px] flex flex-col items-center ">
          <div className=" bg-blue h-[131px] w-full md:rounded-b-[40px] "></div>
          <div className="w-full">
            <div className=" bg-lightDark relative w-full pt-[110px]  flex justify-center items-center flex-col md:rounded-t-3xl -translate-y-6 pb-8">
              <Skeleton
                circle={true}
                width={180}
                height={180}
                containerClassName="absolute  top-0 rounded-full object-cover   border-white -translate-y-1/2 "
              />

              <Skeleton width={90} count={1} height={10} />
              <Skeleton
                width={160}
                count={1}
                height={48}
                borderRadius={"28px"}
                containerClassName=" mt-4 "
              />

              <div className="mt-[22px] flex justify-evenly items-center w-full">
                <div className="flex flex-col justify-center items-center gap-1">
                  <Skeleton width={30} count={1} height={10} />
                  <Skeleton width={60} count={1} height={10} />
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <Skeleton width={30} count={1} height={10} />
                  <Skeleton width={60} count={1} height={10} />
                </div>
              </div>
            </div>
            <div className="my-3 ">
              <Skeleton
                count={1}
                height={96}
                baseColor="#1C2938"
                highlightColor="#15202B"
              />
            </div>
            <FollowersPostsSkeleton/>

          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default ProfileSkeleton;
