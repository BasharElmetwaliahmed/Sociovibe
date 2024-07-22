import { useState } from "react";

const useShowMore = (text, lettersPerPage) => {
  const [showMoreItem, setShowMoreItems] = useState(false);

  const changeShowMore = () => {
    setShowMoreItems(!showMoreItem);
  };

  const longText = text.split("").length > lettersPerPage;

  return {
    showMoreItem,
    displayedText: showMoreItem
      ? text
      : text.split("").slice(0, lettersPerPage).join(""),
    longText,
    changeShowMore,
  };
};

export default useShowMore;
