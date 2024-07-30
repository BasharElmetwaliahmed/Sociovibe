import Bookmarks from "@/app/_components/BookMarks/Bookmarks";
import PostsSkeleton from "@/app/_components/posts/skeleton/PostsSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "bookmarks",
};
function Page() {
  return (
    <Suspense fallback={<PostsSkeleton/>}>
    <Bookmarks/>
    </Suspense>
  );
}

export default Page;
