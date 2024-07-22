import { useEffect, useRef } from "react";

function useClickOutside(close, clickCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }

    document.addEventListener("click", handleClickOutside, clickCapturing);

    return () => {
      document.removeEventListener("click", handleClickOutside, clickCapturing);
    };
  }, [close, clickCapturing]);

  return { ref };
}

export default useClickOutside;
