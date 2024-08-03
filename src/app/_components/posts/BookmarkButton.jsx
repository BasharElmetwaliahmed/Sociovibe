"use client";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { changeBookMarkAction } from "@/app/_lib/action";
import SubmitButtonIcon from "./SubmitButtonIcon";
import toast from "react-hot-toast";
import { useOptimistic } from "react";

function BookmarkButton({ postId, bookmarks }) {
  const [optimisticBoomarks, changeBookmarks] = useOptimistic(
    bookmarks ?? [],
    (state, bookmarked) => {
      if (bookmarked) {
        return state.filter((currId) => currId !== postId);
      }

      return [...state, postId];
    }
  );
  const bookmarked = optimisticBoomarks.includes(postId) ?? false;
  const clientAction = async (formData) => {
    changeBookmarks(bookmarked);
    await changeBookMarkAction(formData);
  };

  return (
    <form action={clientAction}>
      <input
        type={"hidden"}
        name={"post"}
        value={`${postId}%${bookmarked ? "1" : "0"}`}
      />
      <SubmitButtonIcon optimistic={true}>
        {bookmarked ? (
          <BookmarkIcon className="size-6" />
        ) : (
          <BookmarkOutline className="size-6" />
        )}
      </SubmitButtonIcon>
    </form>
  );
}

export default BookmarkButton;
