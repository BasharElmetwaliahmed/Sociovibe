import { auth } from "@/app/_lib/auth";
import { getBookmarks } from "@/app/_lib/services";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import Empty from "../Empty";
import PostsContainer from "../posts/PostsContainer";

async function Bookmarks() {
  const session = await auth();
  const bookmarks = await getBookmarks(session.user.bookmarks);

  if (!bookmarks.length)
    return (
      <Empty
        resource={"Bookmarks"}
        icon={<BookmarkIcon className="size-14" />}
      />
    );

  return <PostsContainer posts={bookmarks} />;
}

export default Bookmarks;
