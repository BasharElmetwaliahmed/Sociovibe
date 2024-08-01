"use client";
import Input from "@/app/_components/Settings/Input";
import Textarea from "@/app/_components/Settings/textarea";
import { updateSettingsAction } from "@/app/_lib/action";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import DeleteAccount from "./DeleteAccount";
import { useFormStatus } from "react-dom";

export default function SettingForm() {
  const auth = useSession();
  const [state, action] = useFormState(updateSettingsAction, {
    bio: "",
    fullName: "",
    message: "",
  });
  const session = auth.data;
  return (
    <form
      className="max-w-[500px] py-6 flex flex-col gap-8 justify-end items-end "
      action={action}>
      <Input
        label="email"
        id="email"
        type={"email"}
        placeholder={"Email example@gmail.com"}
        disabled={true}
        defaultValue={session.user.email}
      />
      <Input
        label="Full name"
        id="fullName"
        type={"text"}
        placeholder={"full name"}
        defaultValue={session.user.fullName}
        error={state.fullName}
      />
      <Textarea defaultValue={session.user.bio} id={"bio"} error={state.bio} />
      <input type={"hidden"} name={"id"} value={session.user.userId} />
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
