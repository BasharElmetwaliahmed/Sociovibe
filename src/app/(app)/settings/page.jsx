
import Spinner from "@/app/_components/Spinner";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import React, { Suspense } from "react";
import SettingForm from "@/app/_components/Settings/SettingForm";
import PageHeading from "@/app/_components/PageHeading";

export const metadata = {
  title: "Settings",
};
function Page() {
  return (
    <div>
      <PageHeading  label={'Settings'}>
        <Cog6ToothIcon />
      </PageHeading>
      <Suspense fallback={<Spinner />}>
        <SettingForm />
      </Suspense>
    </div>
  );
}

export default Page;
