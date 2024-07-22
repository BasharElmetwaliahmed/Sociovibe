"use client";

import useShowMore from "@/app/_hooks/useShowMore";
import React from "react";

function CommentTxt({ text }) {
  const { showMoreItem, displayedText, changeShowMore, longText } = useShowMore(
    text,
    120
  );

  return (
    <p className="text-white text-sm inline overflow-wrap-break-word break-words">
      {displayedText}
      {longText && (
        <button
          className="text-darkBlue text-sm inline ml-2 hover:underline"
          onClick={changeShowMore}>
          {!showMoreItem ? "Show more..." : "Show less"}
        </button>
      )}
    </p>
  );
}

export default CommentTxt;
