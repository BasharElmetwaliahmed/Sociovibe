"use client";
import Image from "next/image";
import { createPostAction } from "@/app/_lib/action";
import UploadPhoto from "./UploadPhoto";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";
import { useState } from "react";

function CreatePostForm() {
  const { data: session } = useSession();
  const [resetKey, setResetKey] = useState("");
  const [error,setError] = useState(false);

  const clientAction = async (formData) => {
    const result = await createPostAction(formData);
    console.log(result);
    if (result?.error) {
      toast.error(result.message);
      setError(true)
    } else {
      toast.success("post published successfully");
      setResetKey(Math.random());
      setError(false)
    }
  };
  return (
    <form
      action={clientAction}
      key={resetKey}
      className={`p-8 bg-lightDark rounded-md mb-6 ${
        error ? "border-red-600" : "border-transparent"
      }  border-2 `}>
      <div className="flex gap-4 items-start ">
        <div className="w-10 h-10 relative">
          <Image
            src={session.user.avatar}
            fill
            alt={session.user.fullName}
            className="aspect-auto rounded-full absolute "
          />
        </div>
        <textarea
          placeholder="what on your mind?"
          name="text"
          className="bg-transparent resize-none overflow-visible h-[60px] pt-2   flex-[1] px-2  outline-none
         text-white placeholder:text-lightBlue "
        />
      </div>
      <div className="flex justify-between items-start  mt-4 border-t-lightBlue border-t-[1px] border-opacity-25 pt-4">
        <UploadPhoto />
        <SubmitButton />
      </div>
    </form>
  );
}

export default CreatePostForm;
