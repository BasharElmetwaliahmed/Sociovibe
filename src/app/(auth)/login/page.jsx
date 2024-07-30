import SignInButton from "../../_components/auth/SignInButton";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();

  if (session?.user) redirect("/");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignInButton />
    </div>
  );
}

export default Page;
