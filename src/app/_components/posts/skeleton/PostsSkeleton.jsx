import PostSkeleton from "./PostSkeleton";

function PostsSkeleton() {
  return (
    <div className="flex flex-col gap-4 ">
      {" "}
      {Array.from({ length: 10 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}

export default PostsSkeleton;
