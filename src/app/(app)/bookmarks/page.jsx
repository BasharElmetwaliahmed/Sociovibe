import Bookmarks from "@/app/_components/BookMarks/page";
import PostsSkeleton from "@/app/_components/posts/skeleton/PostsSkeleton";

import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<PostsSkeleton/>}>
    <Bookmarks/>
    </Suspense>
  );
}

export default Page;
