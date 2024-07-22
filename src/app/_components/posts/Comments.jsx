import { getFirstTwoComments } from "@/app/_lib/services";
import Comment from "./Comment";

async function Comments({id}) {
    const comments = await getFirstTwoComments(id);
    if(comments.length==0) return
  return (
    <div className="space-y-4 my-6 custom max-h-[140px] overflow-y-scroll pr-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments