"use client";
import {
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./auth/LogoutButton";

function Navbar() {
  const pathname = usePathname();
  const iconSize = "size-4";

  const navLinks = [
    {
      icon: <HomeIcon className={iconSize} />,
      to: "/",
      label: "Home",
    },
    {
      icon: <UserGroupIcon className={iconSize} />,
      to: "/following",
      label: "Following",
    },
    {
      icon: <Cog6ToothIcon className={iconSize} />,
      to: "/settings",
      label: "Settings",
    },
    {
      icon: <UserCircleIcon className={iconSize} />,
      to: "/profile",
      label: "Profile",
    },
    {
      icon: <BookmarkIcon className={iconSize} />,
      to: "/bookmarks",
      label: "Bookmarks",
    },
  ];

  return (
    <div className="fixed w-screen container md:top-[106px] mx-auto  bottom-0 z-10   left-1/2
      -translate-x-1/2    md:bottom-auto  ">
      <div className="container relative">
        <div
          className="py-4 h-fit px-6 rounded-md  md:w-fit     w-full container  
      bg-lightDark shadow-sm border-t-2
    md:border-t-0 md:border-r-2 border-darkBlue shadow-darkBlue text-lightBlue z-10">
          <h4 className="font-bold mb-4 md:block hidden">Navigation</h4>
          <nav className="flex md:flex-col justify-between md:justify-start md:gap-2">
            {navLinks.map((link) => (
              <Link
                href={link.to}
                key={link.to}
                className={`flex gap-4 py-2 px-4 text-xl font-semibold items-center
            ${pathname == link.to ? "bg-blue text-white" : ""}
            hover:bg-blue transition-all duration-300 hover:text-white rounded-md`}>
                {link.icon}
                <span className="md:block hidden">{link.label}</span>
              </Link>
            ))}
            {/* <LogoutButton /> */}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
