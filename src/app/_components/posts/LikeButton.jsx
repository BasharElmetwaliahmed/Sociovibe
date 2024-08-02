"use client";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import SubmitButtonIcon from "./SubmitButtonIcon";
import { changeLikeAction } from "@/app/_lib/action";
import { useOptimistic } from "react";

function LikeButton({ liked, post,id }) {
  const [optimisticLikes, changeLike] = useOptimistic(
    post.likes ?? [],
    (state,liked) => {
      if (liked) {
        return state.filter((currId) => currId !== id);
      }

      return [...state, id];
    }
  );
  const clientAction = async (formData) => {
    changeLike( liked);
    await changeLikeAction(formData);
  };
  return (
    <form action={clientAction}>
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
        {optimisticLikes.length ?? 0}
      </SubmitButtonIcon>
    </form>
  );
}

export default LikeButton;
