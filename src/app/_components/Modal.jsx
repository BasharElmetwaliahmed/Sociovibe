"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useClickOutSide from "../_hooks/useClickOutSide";

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openModalName, setOpenModalName] = useState("");
  const close = () => {
    setOpenModalName("");
  };

  return (
    <ModalContext.Provider
      value={{ close, open: setOpenModalName, openModalName }}>
      {children}
    </ModalContext.Provider>
  );
};

const Window = ({ children, openName }) => {
  const { openModalName: windowName, close } = useContext(ModalContext);
  const { ref } = useClickOutSide(close);

  if (windowName !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur z-[1000] flex items-center justify-center">
      <button
        onClick={close}
        className="absolute top-4 right-4 p-2 rounded-full bg-red-600 hover:bg-red-700 transition-all z-50">
        <XMarkIcon className="h-6 w-6 text-white" />
      </button>
      <div
        ref={ref}
        className="rounded-lg bg-white shadow-lg transform transition-all relative ">
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
};

const Open = ({ children, name }) => {
  const { open } = useContext(ModalContext);
  
  return cloneElement(children, { onClick: () => {
    open(name)} });
};

Modal.Window = Window;
Modal.Open = Open;
export default Modal;
