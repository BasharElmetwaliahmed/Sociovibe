import { SessionProvider } from "next-auth/react";
import SearchLayout from "../_components/layout/SearchLayout";
import Logo from "../_components/Logo";
import Navbar from "../_components/Navbar";
import Search from "../_components/Search";
import { auth } from "../_lib/auth";

export default async function PageLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen  dark:bg-black dark:text-white">
        <nav className=" py-6  fixed w-screen md:px-0 px-2   border-b-lightDark border-b-[2px] top-0 bg-dark  z-10 left-1/2 -translate-x-1/2">
          <div className="container flex mx-auto justify-between ">
            <Logo />
            <Search />
          </div>
        </nav>
        <div>
          <Navbar />
        </div>
        <main className="w-full md:max-w-[500px] lg:max-w-[700px] xl:max-w-[900px] mb-20  mt-[96px] md:mt-[105px] md:left-[250px] relative md:px-0 px-2  ">
          <SearchLayout>{children}</SearchLayout>
        </main>
      </div>
    </SessionProvider>
  );
}
