"use client";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { changeBookMarkAction } from "@/app/_lib/action";
import SubmitButtonIcon from "./SubmitButtonIcon";
import toast from "react-hot-toast";

function BookmarkButton({ bookmarked,postId }) {
  return (
    <form
      action={async (formData) => {
        await changeBookMarkAction(formData);
        if (!bookmarked) {
          toast.success("post added successfully to bookmarks");
        } else {
          toast.success("post removed successfully from bookmarks");
        }
      }}>
      <input
        type={"hidden"}
        name={"post"}
        value={`${postId}%${bookmarked ? "1" : "0"}`}
      />
      <SubmitButtonIcon>
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
