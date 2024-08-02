import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import SettingForm from "@/app/_components/Settings/SettingForm";
import PageHeading from "@/app/_components/PageHeading";
import { auth } from "@/app/_lib/auth";
import { getUserByEmail } from "@/app/_services/users";

export const metadata = {
  title: "Settings",
};
async function Page() {
  const session=await auth();
  const user = await getUserByEmail(session.user.email)
  return (
    <div>
      <PageHeading label={"Settings"}>
        <Cog6ToothIcon />
      </PageHeading>
      <SettingForm user={user} />
    </div>
  );
}

export default Page;
