"use client";
import { addCommentAction } from "@/app/_lib/action";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

function AddCommentForm({ id, addOptimisticComment }) {
  const inputRef = useRef();
  const session = useSession();
  const addCommentHandler = async (formData) => {
    const text = formData.get("text");
    if (!text) {
      return toast.error("Please enter comment value");
    }
    addOptimisticComment({
      text,
      id: Math.random(),
      created_at: generateISODateString(),
      user: {
        avatar: session.data.user.avatar,
        fullName: session.data.user.fullName,
      },
    });
    inputRef.current.value='';
    const result = await addCommentAction(formData);
    if (result.message) {
      toast.success(result.message);
    }
  };
  return (
    <form
      className="flex gap-2 items-stretch w-full"
      action={addCommentHandler}>
      <input
        type="text"
        id={`${id}`}
        ref={inputRef}
        placeholder="add comment here"
        name="text"
        className=" text-white focus:border-blue focus:text-blue focus:placeholder:text-blue
        transition-all duration-300 outline-none self-stretch justify-self-stretch flex-[1] border-[1px] border-lightBlue px-2 
         py-1 bg-transparent placeholder:text-lightBlue rounded-md"
      />
      <input type="hidden" name="postId" value={id} />

      <SubmitButton optimistic={true} />
    </form>
  );
}

export default AddCommentForm;

function generateISODateString() {
  const date = new Date();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  return formattedDate;
}
