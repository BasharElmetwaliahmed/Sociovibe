import PostsSkeleton from "@/app/_components/posts/skeleton/PostsSkeleton";
import UserPosts from "@/app/_components/profile/UserPosts";
import React, { Suspense } from "react";

function page({ params }) {
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <UserPosts id={params.userId} />
    </Suspense>
  );
}

export default page;
