"use client";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import { usePathname, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function FollowButton({ followed }) {
  const { pending } = useFormStatus();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  return (
    <>
      {search && (
        <input
          type={"hidden"}
          name="currentpath"
          value={`${pathname}?search=${search}`}
        />
      )}
      {followed ? (
        <button
          disabled={pending}
          className="flex items-center gap-2 disabled:bg-lightBlue border-blue text-white w-28  p-2 font-semibold h-12 hover:bg-transparent bg-blue transition-all duration-300 border-[1px] rounded-md">
          {pending ? (
            <SpinnerMini />
          ) : (
            <>
              <UserMinusIcon className="w-5" />
              Unfollow
            </>
          )}
        </button>
      ) : (
        <button
          disabled={pending}
          className="border-blue flex items-center disabled:bg-lightBlue gap-2 text-white  p-2 font-semibold w-28 h-12  hover:bg-blue transition-all duration-300 border-[1px] rounded-md">
          {pending ? (
            <SpinnerMini />
          ) : (
            <>
              <UserPlusIcon className="w-5" />
              Follow
            </>
          )}
        </button>
      )}
    </>
  );
}

export default FollowButton;
