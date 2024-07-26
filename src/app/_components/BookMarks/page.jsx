import { auth } from "@/app/_lib/auth";
import { getBookmarks } from "@/app/_lib/services";
import PostsContainer from "../posts/PostsContainer";

async function Bookmarks() {
  const session = await auth();
  const bookmarks = await getBookmarks(session.user.bookmarks);
  return <PostsContainer posts={bookmarks} />;
}

export default Bookmarks;
