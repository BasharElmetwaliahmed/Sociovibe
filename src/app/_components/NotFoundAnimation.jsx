"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import animationData from "@/app/_lib/notfound-animation.json";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
function NotFoundAnimation({ resource }) {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4 ">
      <DynamicLottie animationData={animationData} />
      <Link
        className="text-white font-semibold text-xl bg-blue p-4 rounded-md"
        href={"/"}>
        Back To Home{" "}
      </Link>
      {resource && <p className="text-2xl text-white font-semibold">Invalid {resource} id</p>}
    </div>
  );
}

export default NotFoundAnimation;
