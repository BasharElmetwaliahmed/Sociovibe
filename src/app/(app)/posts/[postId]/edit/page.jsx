import CreateEditPostForm from "@/app/_components/posts/CreateEditPostForm";
import { auth } from "@/app/_lib/auth";
import { getPostById } from "@/app/_lib/services";
import { notFound } from "next/navigation";

async function Page({ params }) {
  const post = await getPostById(Number(params.postId));
  const session = await auth();
  if (post.user_id !== session.user.userId) throw new Error('You don\'t have permission to edit this post');

  return (
    <div>
      <CreateEditPostForm post={post} />
    </div>
  );
}

export default Page;
