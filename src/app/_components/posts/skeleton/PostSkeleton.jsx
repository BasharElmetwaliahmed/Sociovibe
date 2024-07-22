import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function PostSkeleton() {
  return (
    <SkeletonTheme baseColor="#15202B" highlightColor="#1C2938">
      <div className="py-4 px-8 bg-lightDark rounded-md">
        <div className="flex justify-between items-center border-b-lightBlue border-b-[1px] pb-4 border-opacity-25">
          <div className="flex items-center gap-4">
            <Skeleton circle={true} width={40} height={40} />

            <div className="flex flex-col gap-1">
              <Skeleton width={90} count={1} height={7} />
              <Skeleton width={60} height={7} />
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-2 gap-2">
          <Skeleton height={290} />
          <Skeleton height={40} />
          <Skeleton height={30} />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default PostSkeleton;
