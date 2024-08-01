"use client";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../_hooks/useClickOutSide";

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openedId, setOpenedId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const open = (id) => setOpenedId(id);
  const close = () => setOpenedId("");

  return (
    <MenusContext.Provider
      value={{ open, openedId, close, position, setPosition }}>
      <div className="relative">{children}</div>
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openedId, close, open, setPosition } = useContext(MenusContext);
  const buttonRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (openedId === id && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          x: rect.left,
          y: rect.bottom,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openedId, id, setPosition]);

  function toggleHandler(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: rect.left,
      y: rect.bottom,
    });
    if (openedId === id) {
      close();
    } else {
      open(id);
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleHandler}
      className="bg-none border-none p-1 rounded-sm transform transition-transform hover:opacity-45">
      <EllipsisHorizontalIcon className="w-6 font-bold" />
    </button>
  );
};

const List = ({ id, children }) => {
  const { openedId, position, close } = useContext(MenusContext);
  const { ref } = useClickOutside(close, false);

  if (openedId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      className="fixed z-[800] bg-dark text-white shadow-md rounded-md p-1"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-100%)",
      }}>
      {children}
    </ul>,
    document.body
  );
};

const Button = ({ children, click, disabled }) => {
  const { close } = useContext(MenusContext);

  function handleClick() {
    click?.();
    close();
  }

  return (
    <li>
      <button
        disabled={disabled}
        className="w-full text-left bg-none border-none p-2 text-base transition-all flex items-center gap-1 disabled:cursor-not-allowed disabled:bg-bg-gray-900 hover:bg-lightDark"
        onClick={click ? handleClick : null}>
        {children}
      </button>
    </li>
  );
};

Menus.List = List;
Menus.Button = Button;
Menus.Toggle = Toggle;
Menus.Menu = ({ children }) => (
  <div className="flex items-center justify-end">{children}</div>
);

export default Menus;
