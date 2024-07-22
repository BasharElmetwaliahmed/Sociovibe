import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProfileHeader({ user }) {
  return (
    <>
      <div className=" bg-lightDark relative w-full   flex justify-center items-center flex-col md:rounded-t-3xl -translate-y-6 pb-8">
        <div className="w-[180px] h-[180px]  top-0 border-white  -mt-20 relative ">
          <Image
            src={user.avatar}
            className="   rounded-full object-cover border-[3px] shadow-md shadow-black "
            alt={user.fullName}
            fill
          />
        </div>
        <h3 className="  text-lg font-bold">{user.fullName}</h3>
        <button className="py-3 px-14 bg-blue  mt-4 rounded-[28px] font-semibold">
          Follow
        </button>
        <div className="mt-[22px] flex justify-evenly items-center w-full">
          <Link
            href={`/profile/${user.id}/followers`}
            className="flex flex-col justify-center items-center gap-1 transition-all duration-300 hover:opacity-50">
            <h4 className="text-blue font-bold text-xl">
              {user.followers_count}
            </h4>
            <span className="text-lightBlue text-xl font-medium">
              Followers
            </span>
          </Link>
          <Link
            href={`/profile/${user.id}/following`}
            className="flex flex-col justify-center items-center gap-1 transition-all duration-300 hover:opacity-50">
            <h4 className="text-blue font-bold text-xl">
              {user.following_count}
            </h4>
            <span className="text-lightBlue text-xl font-medium">
              Following
            </span>
          </Link>
        </div>
      </div>
      <div className="my-3 bg-lightDark p-4  text-base">
        <h3 className="font-bold mb-4">About</h3>
        <p className="font-light">{user.bio}</p>
      </div>
    </>
  );
}

export default ProfileHeader;
