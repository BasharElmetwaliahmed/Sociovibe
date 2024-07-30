import { UsersIcon } from "@heroicons/react/24/solid";
import React from "react";
import { auth } from "../_lib/auth";
import Empty from "./Empty";
import UserItemList from "./UserItemList";

async function FollowersFollowingContainer({ items, label, icon, following }) {
  const session = await auth();

  return (
    <div className="bg-lightDark py-6 px-4 md:p-8 rounded-md shadow-sm shadow-blue ">
      <h2 className="text-white text-3xl font-extrabold">{label}</h2>
      {!items.length ? (
         <Empty resource={label} icon={<UsersIcon className="size-14"/>}/>
      ) : (
        <div className="flex flex-col gap-2 my-8 min-h-[450px] justify-center ">
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
      )}
    </div>
  );
}

export default FollowersFollowingContainer;
