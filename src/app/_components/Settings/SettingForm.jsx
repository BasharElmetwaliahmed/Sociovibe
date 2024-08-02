"use client";
import Input from "@/app/_components/Settings/Input";
import Textarea from "@/app/_components/Settings/textarea";
import { updateSettingsAction } from "@/app/_lib/action";
import { useSession } from "next-auth/react";
import DeleteAccount from "./DeleteAccount";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingForm({user}) {
  const auth = useSession();
  // const [state, action] = useFormState(updateSettingsAction, {
  //   bio: "",
  //   fullName: "",
  //   message: "",
  // });
  const router = useRouter();
  const [state, setErrors] = useState({
    message: "",
    fullName: "",
    bio: "",
    success: false,
  });
  // const session = auth.data;
  const clientAction = async (formData) => {
      const res = await updateSettingsAction(state, formData);
      if (res?.success) {
        
        router.push("/profile");
      }
     else{
        setErrors(res)
      }
   
  };
  return (
    <form
      className="max-w-[500px] py-6 flex flex-col gap-8 justify-end items-end "
      action={clientAction}>
      <Input
        label="email"
        id="email"
        type={"email"}
        placeholder={"Email example@gmail.com"}
        disabled={true}
        defaultValue={user.email}
      />
      <Input
        label="Full name"
        id="fullName"
        type={"text"}
        placeholder={"full name"}
        defaultValue={user.fullName}
        error={state.fullName}
      />
      <Textarea defaultValue={user.bio} id={"bio"} error={state.bio} />
      <input type={"hidden"} name={"id"} value={user.id} />
      <SaveButton />
      <DeleteAccount />
    </form>
  );
}

const SaveButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-blue transition hover:opacity-80 hover:shadow-xl 
        focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-500  focus:ring active:text-blue">
      Save
    </button>
  );
};
