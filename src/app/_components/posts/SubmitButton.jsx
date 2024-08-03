'use client'
import SpinnerMini from "../SpinnerMini";
import { useFormStatus } from "react-dom";

function SubmitButton({ optimistic }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending && !optimistic}
      className="bg-blue disabled:bg-lightBlue px-6 py-2 text-base rounded-sm hover:bg-transparent border-[1px]
        text-white font-semibold disabled:cursor-not-allowed border-transparent hover:border-blue transition-all duration-300  h-10 w-20">
      {pending && !optimistic ? <SpinnerMini /> : "Post"}
    </button>
  );
}

export default SubmitButton;
