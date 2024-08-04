import React from "react";

function ButtonIcon({ children, type, className, onClick, disabled }) {
  const baseStyle =
    "flex items-center gap-3 transition-all duration-300 hover:opacity-75 py-2 px-4 text-white font-semibold rounded-md";
  const typeStyles = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    danger: "bg-red-600",
    warning: "bg-yellow-600",
  };

  const typeStyle = typeStyles[type] || "";

  return (
    <button
     type="button"
      className={`${baseStyle} ${typeStyle} ${className} disabled:bg-gray-700 disabled:cursor-not-allowed `}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonIcon;
