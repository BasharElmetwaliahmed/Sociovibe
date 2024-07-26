
import Spinner from "@/app/_components/Spinner";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import React, { Suspense } from "react";
import SettingForm from "@/app/_components/Settings/SettingForm";

function Page() {
  return (
    <div>
      <h2 className="text-white font-medium text-3xl flex items-center gap-2 ">
        <Cog6ToothIcon className="size-12" />
        Settings
      </h2>
      <Suspense fallback={<Spinner/>}>
      <SettingForm/>
      </Suspense>

    </div>
  );
}

export default Page;
