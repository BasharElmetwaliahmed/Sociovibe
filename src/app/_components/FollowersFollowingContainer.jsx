import React from "react";
import { auth } from "../_lib/auth";
import UserItemList from "./UserItemList";

async function FollowersFollowingContainer({ items, label, icon, following }) {
  const session = await auth();
  console.log(following)
  return (
    <div className="bg-lightDark py-6 px-4 md:p-8 rounded-md shadow-sm shadow-blue min-h-[500px]">
      <h2 className="text-white text-3xl font-extrabold">{label}</h2>
      <div className="flex flex-col gap-2 my-8 ">
        {items.map((user) => (
          <UserItemList
            key={user.id}
            user={{
              id: user.id,
              avatar: user.avatar,
              fullName: user.fullName,
            }}
            following={following}
            userId={session.user.userId}
          />
        ))}
      </div>
    </div>
  );
}

export default FollowersFollowingContainer;
