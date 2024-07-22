import Skeleton from "react-loading-skeleton";

function FollowersPostsSkeleton() {
  return (
    <>
      <Skeleton
        count={1}
        height={168}
        baseColor="#1C2938"
        highlightColor="#15202B"
      />
      <div className="mt-4">
        <Skeleton
          count={1}
          height={134}
          containerClassName="  bg-lightDark"
          baseColor="#1C2938"
          highlightColor="#15202B"
        />
      </div>
    </>
  );
}

export default FollowersPostsSkeleton