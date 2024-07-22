
import {formatDistanceToNow} from 'date-fns'
import CommentTxt from './Commenttxt';
function Comment({comment}) {
    const { avatar, fullName } = comment.user;
    const { text, created_at } = comment;
    const timeAgo = formatDistanceToNow(new Date(created_at), {
      addSuffix: true,
    });
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          src={avatar}
          alt={`${fullName}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-blue ">{fullName}</span>
          <small className="text-gray-400">{timeAgo}</small>
        </div>
        <CommentTxt text={text} />
      </div>
    </div>
  );
}

export default Comment