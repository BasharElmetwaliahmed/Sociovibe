import { getFirstTwoComments } from "@/app/_lib/services";

import CommentsContainer from "./CommentsContainer";

async function Comments({ id }) {
  const comments = await getFirstTwoComments(id);
  return (
    <>
      <CommentsContainer id={id} comments={comments} />
      
    </>
  );
}

export default Comments;
