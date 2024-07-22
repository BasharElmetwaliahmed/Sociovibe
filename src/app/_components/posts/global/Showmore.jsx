"use client";
import { cloneElement, useContext, useState, useState } from "react";

const ShowmoreContext = useContext();

function Showmore({ children }) {
  const [showMore, setShowMore] = useState(true);
  const changeShowMore = () => setShowMore(!showMore);


  return <ShowmoreContext.Provider>{children}</ShowmoreContext.Provider>;
}



function Toggle({ children,changeShowMore }) {
  
  const {changeShowMore} = useContext(ShowmoreContext)
  return cloneElement(chlidren, {
    onClick: changeShowMore,
  });
}
function Text ({children,sliceNum}){
  const { showMore , text } = useContext(ShowmoreContext);
    const displayedText = showMore
    ? text
    : text.split(" ").slice(0, 20).join(" ");
  const longTxt = text.split(" ").length > 20;
  return (
    <p className="text-white text-sm">
      {displayedText}
      {longTxt && (
        <button
          className="text-darkBlue text-sm inline ml-2 hover:underline"
          onClick={() => setShowMore(!showMore)}>
          {!showMore ? "Show more..." : "Show less"}
        </button>
      )}
    </p>
  );

}
export default Showmore;
