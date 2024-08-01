"use client";
import Image from "next/image";
import { createPostAction, editPostAction } from "@/app/_lib/action";
import UploadPhoto from "./UploadPhoto";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

function CreateEditPostForm({ post }) {
  const { data: session } = useSession();
  const [error, setError] = useState(false);
  const [text, setText] = useState(post.text);
  const [file, setFile] = useState({
    file: "",
    filePath: post.image ?? null,
  });
  // const [response, submitForm] = useFormState(createPostAction, {
  //   resetKey: "",
  //   error: null,
  // });
  // let updatePostWithIdAction;
  // if (post.id) updatePostWithIdAction = editPostAction.bind(null, post);
  const clientAction = async (formData) => {
    if (file.filePath == post.image && text === post.text) {
      setError(true);
      return toast.error("there is no thing to update");
    }
    if (text.trim() === "" && !file.filePath) {
      setError(true);
      return toast.error("Content or image cannot be empty both");
    }
    const result = await editPostAction(
      post,
      formData,
      Boolean(file.filePath && !file.file)
    );

    if (result?.error) {
      toast.error(result.message);
      setError(true);
    } else {
      toast.success("post edited successfully");
      setError(false);
      redirect("/");
    }
  };

  return (
    <form
      action={clientAction}
      className={`p-8 bg-lightDark rounded-md mb-6 ${
        error ? "border-red-600" : "border-transparent"
      }  border-2 `}>
      <div className="flex gap-4 items-start ">
        <div className="w-10 h-10 relative">
          <Image
            src={session.user.avatar}
            alt={session.user.fullName}
            fill
            className="aspect-auto rounded-full absolute "
          />
        </div>
        <textarea
          placeholder="what on your mind?"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent resize-none overflow-visible h-[60px] pt-2   flex-[1] px-2  outline-none
         text-white placeholder:text-lightBlue "
        />
      </div>
      <div className="flex justify-between items-start  mt-4 border-t-lightBlue border-t-[1px] border-opacity-25 pt-4">
        <UploadPhoto file={file} setFile={setFile} image={post.image} />
        <SubmitButton />
      </div>
    </form>
  );
}

export default CreateEditPostForm;
