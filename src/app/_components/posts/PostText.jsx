"use client";

import useShowMore from "@/app/_hooks/useShowMore";

function PostText({ text }) {
  const { showMoreItem, displayedText, changeShowMore, longText } = useShowMore(
    text,
    120
  );

  return (
    <div className="py-4 text-white text-base font-semibold">
      <p className="inline overflow-wrap-break-word break-words">
        {displayedText}
      </p>
      {longText && (
        <button
          className="text-darkBlue text-sm inline ml-2 hover:underline"
          onClick={changeShowMore}>
          {!showMoreItem ? "Show more..." : "Show less"}
        </button>
      )}
    </div>
  );
}

export default PostText;
