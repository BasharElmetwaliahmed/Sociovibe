import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as HeartOutline,
  ChatBubbleBottomCenterIcon,
  BookmarkIcon as BookmarkOutline,
} from "@heroicons/react/24/outline";
import { changeBookMarkAction, changeLikeAction } from "@/app/_lib/action";
import { auth } from "@/app/_lib/auth";
import { getCommentsCount } from "@/app/_lib/services";
import SubmitButtonIcon from "./SubmitButtonIcon";

async function PostFooter({ post }) {
  const session = await auth();
  const commentCount = await getCommentsCount(post.id);
  const liked = post.likes?.includes(session.user.userId) ?? false;
  const bookmarked = session.user.bookmarks.includes(post.id);

  console.log(post.likes)

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
      <form action={changeBookMarkAction}>
        <input
          type={"hidden"}
          name={"post"}
          value={`${post.id}%${bookmarked ? "1" : "0"}`}
        />
        <SubmitButtonIcon>
          {bookmarked ? (
            <BookmarkIcon className="size-6" />
          ) : (
            <BookmarkOutline className="size-6" />
          )}
        </SubmitButtonIcon>
      </form>
    </div>
  );
}

export default PostFooter;
