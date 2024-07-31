import { SessionProvider } from "next-auth/react";
import Header from "../_components/layout/Header";
import SearchLayout from "../_components/layout/SearchLayout";
import Navbar from "../_components/Navbar";
import { auth } from "../_lib/auth";
export const metadata = {
  title: "Search",
};

export default async function PageLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen  dark:bg-black dark:text-white">
        <Header />
        <div className="relative flex md:flex-row flex-col items-start container justify-end gap-4 pt-[94px]  md:p-0  left-0 md:left-auto w-full md:top-[105px] bottom-0 md:bottom-auto">
          <Navbar />
          <main className="w-full  mb-[68px]  md:px-2  md:w-[500px] lg:w-[700px] xl:w-[900px] ">
            <SearchLayout>{children}</SearchLayout>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
