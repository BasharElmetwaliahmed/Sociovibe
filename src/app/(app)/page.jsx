import { Suspense } from "react";
import CreatePostForm from "../_components/posts/CreatePostForm";
import Posts from "../_components/posts/Posts";
import PostsSkeleton from "../_components/posts/skeleton/PostsSkeleton";
import SearchFriends from "../_components/SearchFriends";
export default function Home({ searchParams }) {
  return (
    <main className="">
      {searchParams?.search ? (
        <SearchFriends search={searchParams.search} />
      ) : (
        <>
          <CreatePostForm />
          <Suspense
            fallback={<PostsSkeleton/>}>
            <Posts />
          </Suspense>
        </>
      )}
    </main>
  );
}
