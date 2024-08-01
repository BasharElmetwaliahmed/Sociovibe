import { cloneElement } from "react";

function PageHeading({label,children}) {
  return (
    <h2 className="text-white text-3xl font-extrabold my-4 flex items-center gap-3">
      {cloneElement(children, {
        className: "size-12",
      })}
      {label}
    </h2>
  );
}

export default PageHeading