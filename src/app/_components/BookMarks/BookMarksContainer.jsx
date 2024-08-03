"use client";
import useOptimistic from "@/app/_hooks/useOptimistic";
import React from "react";
import PostsContainer from "../posts/PostsContainer";

function BookMarksContainer({ bookmarks }) {
  const [optimisticBoomarks, changeBookmark] = useOptimistic(
    bookmarks ?? [],
    (state, { bookmarked, post }) => {
      if (bookmarked) {
        return state.filter((currId) => currId !== post.id);
      } else {
        return [...state, post];
      }
    }
  );
  return (
    <PostsContainer
      posts={optimisticBoomarks}
      optimisticBoomarks={optimisticBoomarks}
      changeBookmark={changeBookmark}
    />
  );
}

export default BookMarksContainer;
