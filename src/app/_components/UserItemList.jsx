import Image from "next/image";
import Link from "next/link";
import { changeFollowings } from "../_lib/action";
import FollowButton from "./FollowButton";

function UserItemList({ user, following, userId }) {
  const followed = following.find((currUser) => currUser.id === user.id);

  return (
    <div className="flex justify-between items-center border-b-2 border-lightBlue py-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 relative">
          <Image
            src={user.avatar}
            fill
            alt={user.fullName}
            className="aspect-auto rounded-full absolute "
          />
        </div>
        <Link
          href={`/profile/${user.id}`}
          className="text-xl font-semibold text-white cursor-pointer">
          {user.fullName}
        </Link>
      </div>
      {userId != user.id && (
        <form action={changeFollowings}>
          <input type="hidden" name="userId" value={user.id} />
          <FollowButton followed={followed} />
        </form>
      )}
    </div>
  );
}

export default UserItemList;
