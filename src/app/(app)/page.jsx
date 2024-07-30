import { Suspense } from "react";
import CreatePostForm from "../_components/posts/CreatePostForm";
import Posts from "../_components/posts/Posts";
import PostsSkeleton from "../_components/posts/skeleton/PostsSkeleton";
export const metadata = {
  title: "Home",
};
export default function Home({ searchParams }) {
  return (
    <main className="">
          <CreatePostForm />
          <Suspense
            fallback={<PostsSkeleton/>}>
            <Posts />
          </Suspense>
    </main>
  );
}
