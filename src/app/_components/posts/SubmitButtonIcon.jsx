'use client'
import { useFormStatus } from "react-dom";
function SubmitButtonIcon({ children, optimistic =false }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending && !optimistic}
      className="text-lightBlue font-extralight 
      disabled:cursor-not-allowed disabled:opacity-40 flex items-center gap-2 text-sm hover:opacity-40 transition-all duration-300">
      {children}
    </button>
  );
}

export default SubmitButtonIcon;
