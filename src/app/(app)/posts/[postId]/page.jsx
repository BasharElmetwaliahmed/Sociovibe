import Post from "@/app/_components/posts/Post";
import PostSkeleton from "@/app/_components/posts/skeleton/PostSkeleton";
import { getPostById } from "@/app/_lib/services";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function page({ params }) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostComponent id={Number(params.postId)} />
    </Suspense>
  );
}

async function PostComponent({ id }) {
  const post = await getPostById(id);
  if (!post) notFound();
  return <div className="my-4">{<Post post={post} />}</div>;
}

export default page;
