import { HeartIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as HeartOutline,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { changeLikeAction } from "@/app/_lib/action";
import { auth } from "@/app/_lib/auth";
import { getCommentsCount } from "@/app/_lib/services";
import SubmitButtonIcon from "./SubmitButtonIcon";
import BookmarkButton from "./BookmarkButton";

async function PostFooter({ post }) {
  const session = await auth();
  const commentCount = await getCommentsCount(post.id);
  const liked = post.likes?.includes(session.user.userId) ?? false;
  const bookmarked = session.user.bookmarks.includes(post.id);

  return (
    <div className="py-4 border-t-lightBlue border-t-[1px] pb-4 border-opacity-25 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <form action={changeLikeAction}>
          <input
            type={"hidden"}
            name={"post"}
            value={`${post.id}%${liked ? "1" : "0"}`}
          />
          <SubmitButtonIcon>
            {!liked ? (
              <HeartOutline className="size-6" />
            ) : (
              <HeartIcon className="size-6 text-red-500 " />
            )}
            {post?.likes?.length ?? 0}
          </SubmitButtonIcon>
        </form>
        <label htmlFor={`${post.id}`}>
          <button className="text-lightBlue font-extralight flex items-center gap-2 text-sm hover:opacity-40 transition-all duration-300">
            <ChatBubbleBottomCenterIcon className="size-6" />
            {commentCount}
          </button>
        </label>
      </div>
      <BookmarkButton bookmarked={bookmarked} postId={post.id} />
    </div>
  );
}

export default PostFooter;
