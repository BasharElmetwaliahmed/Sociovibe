'use client'
import Input from "@/app/_components/Settings/Input";
import Textarea from "@/app/_components/Settings/textarea";
import { updateSettingsAction } from "@/app/_lib/action";
import { useSession } from "next-auth/react";
import React from "react";

export default  function SettingForm() {
  const auth =  useSession();
  const session = auth.data
  return (
    <form
      className="max-w-[500px] py-14 flex flex-col gap-8 justify-end items-end "
      action={updateSettingsAction}>
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
      />
      <Textarea defaultValue={session.user.bio}  id={'bio'}/>

      <button
        className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-blue transition hover:scale-110 hover:shadow-xl 
        focus:outline-none focus:ring active:text-blue">
        Save
      </button>
    </form>
  );
}
