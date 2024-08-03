import { getUser } from "@/app/_services/users";
import Profile from "@/app/_components/profile/Profile";
import { getUserProfileWithStats } from "@/app/_lib/services";
import { notFound } from "next/navigation";

export const generateMetadata = async function ({ params }) {
  const { fullName } = await getUser(params.userId);
  return {
    title: fullName,
  };
};

async function Page({ params }) {
  const user = await getUserProfileWithStats(params.userId);
  return (
    <div className="-mt-[15px]">
      <Profile user={user} />
    </div>
  );
}

export default Page;
