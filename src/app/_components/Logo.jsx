"use client";
import { AtSymbolIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
function Logo() {
  return (
    <Link
      href="/"
      className="font-extrabold text-2xl  flex items-center text-white  ">
      <AtSymbolIcon className="size-8" />
      <span className="text-blue ml-2">S</span>ociovibe
    </Link>
  );
}

export default Logo;
