import Image from "next/image";
import Link from "next/link";
import { parseISO, formatDistanceToNow } from "date-fns";
import PostMenu from "./PostMenu";

function PostHeader({ post }) {
  const formatDateToRelative = (dateString) => {
    const parsedDate = parseISO(dateString);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };
  console.log(post)
  return (
    <div className="flex justify-between items-center border-b-lightBlue border-b-[1px] pb-4 border-opacity-25">
      <Link
        href={`/profile/${post.user_id}`}
        className="flex items-center gap-4">
        <div className="w-10 h-10 relative">
          <Image
            src={post?.users?.avatar}
            fill
            className="aspect-auto rounded-full absolute "
            alt={post.users.fullName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-white text-lg font-semibold">
            {post.users.fullName}
          </h4>
          <p className="text-sm text-lightBlue">{formatDateToRelative(post.created_at)}</p>
        </div>
      </Link>
      <div className="text-white">
       <PostMenu post={post}/>
      </div>
    </div>
  );
}

export default PostHeader;
