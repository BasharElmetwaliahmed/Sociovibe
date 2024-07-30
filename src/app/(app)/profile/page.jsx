import Profile from "@/app/_components/profile/Profile";
import { auth } from "@/app/_lib/auth";
import { getUserProfileWithStats } from "@/app/_lib/services";

export const metadata = {
  title: "Profile",
};
async function Page() {
  const session = await auth();
  const user = await getUserProfileWithStats(session.user.userId);
  return (
    <>
      <Profile user={user} />
    </>
  );
}

export default Page;
