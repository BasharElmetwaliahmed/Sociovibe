"use client";
import { addCommentAction } from "@/app/_lib/action";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

function AddCommentForm({ id }) {
  const [resetKey, setRestKey] = useState();
  const addCommentHandler = async (formData) => {
    const text = formData.get("text");
    if (!text) {
      return toast.error("Please enter comment value");
    }
    const result = await addCommentAction(formData);
    if (result.message) {
      toast.success(result.message);
      setRestKey(Math.random() * 100);
    }
  };
  return (
    <form
      className="flex gap-2 items-stretch w-full"
      key={resetKey}
      action={addCommentHandler}>
      <input
        type="text"
        id={`${id}`}
        placeholder="add comment here"
        name="text"
        className=" text-white focus:border-blue focus:text-blue focus:placeholder:text-blue
        transition-all duration-300 outline-none self-stretch justify-self-stretch flex-[1] border-[1px] border-lightBlue px-2 
         py-1 bg-transparent placeholder:text-lightBlue rounded-md"
      />
      <input type="hidden" name="postId" value={id} />

      <SubmitButton />
    </form>
  );
}

export default AddCommentForm;
