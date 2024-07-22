import Post from "@/app/_components/posts/Post";
import PostSkeleton from "@/app/_components/posts/skeleton/PostSkeleton";
import { getPostById } from "@/app/_lib/services";
import { Suspense } from "react";

async function page({ params }) {

  return (
    <Suspense fallback={<PostSkeleton/>}>
      <PostComponent id={Number(params.postId)} />
    </Suspense>
  );
}

async function PostComponent({id}) {
  const post = await getPostById(id);
  return (
    <div className="my-4">
      <Post post={post} />
    </div>
  );
}

export default page;
