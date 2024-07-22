"use client";
import Image from "next/image";
import { createPostAction, editPostAction } from "@/app/_lib/action";
import UploadPhoto from "./UploadPhoto";
import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";

function CreateEditPostForm({ post }) {
  const { data: session } = useSession();
  const { pending } = useFormStatus();
  const [response, submitForm] = useFormState(createPostAction, {
    resetKey: "",
    error: null,
  });
  let updatePostWithIdAction;
  if (post.id) updatePostWithIdAction = editPostAction.bind(null, post);

  return (
    <form
      action={post.id ? updatePostWithIdAction : submitForm}
      key={response.resetKey}
      className="p-8 bg-lightDark rounded-md mb-6 ">
      <div className="flex gap-4 items-start ">
        <div className="w-10 h-10 relative">
          <Image
            src={session.user.avatar}
            fill
            className="aspect-auto rounded-full absolute "
          />
        </div>
        <textarea
          placeholder="what on your mind?"
          name="text"
          defaultValue={post.text ? post.text : ""}
          className="bg-transparent resize-none overflow-visible h-[60px] pt-2   flex-[1] px-2  outline-none
         text-white placeholder:text-lightBlue "
        />
      </div>
      <div className="flex justify-between items-start  mt-4 border-t-lightBlue border-t-[1px] border-opacity-25 pt-4">
        <UploadPhoto image={post.image} />
        <SubmitButton />
      </div>
    </form>
  );
}

export default CreateEditPostForm;
