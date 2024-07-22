import CreateEditPostForm from "@/app/_components/posts/CreateEditPostForm";
import { getPostById } from "@/app/_lib/services";

async function Page({ params }) {
  const post = await getPostById(Number(params.postId));

  return (
    <div>
      <CreateEditPostForm post={post} />
    </div>
  );
}

export default Page;
