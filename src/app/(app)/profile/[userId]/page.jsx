import Profile from "@/app/_components/profile/Profile";
import { auth } from "@/app/_lib/auth";
import { getUserProfileWithStats } from "@/app/_lib/services";

async function Page({params}) {
  const user = await getUserProfileWithStats(params.userId);
  return (
    <>
    <Profile user={user}/>
    </>
    
  );
}

export default Page