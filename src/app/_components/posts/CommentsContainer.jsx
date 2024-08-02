"use client";
import { useOptimistic } from "react";
import AddCommentForm from "./AddCommentForm";
import CommentComponent from "./Comment";
function CommentsContainer({ id, comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => {
      return [...state, newComment];
    }
  );
  return (
    <>
      {" "}
      {optimisticComments.length > 0 && (
        <div className="max-h-[140px] space-y-4 my-6 custom  overflow-y-scroll pr-4">
          {optimisticComments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </div>
      )}
      <AddCommentForm id={id} addOptimisticComment={addOptimisticComment} />
    </>
  );
}

export default CommentsContainer;
