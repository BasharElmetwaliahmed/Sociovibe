import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import CommentTxt from "./Commenttxt";

function CommentComponent({ comment }) {
  const { avatar, fullName } = comment.user;
  const { text, created_at } = comment;
  const date = new Date(created_at);
  const timeAgo = formatDistanceToNow(date, {
    addSuffix: true,
  });

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 relative w-12 h-12">
        <Image
          src={avatar}
          fill
          alt={`${fullName}'s avatar`}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <span className="font-semibold md:text-base text-sm text-blue">{fullName}</span>
          <small className="text-gray-400 md:text-sm text-xs">{timeAgo}</small>
        </div>
        <CommentTxt text={text} />
      </div>
    </div>
  );
}

export default CommentComponent;
