import { UsersIcon } from "@heroicons/react/24/solid";
import React from "react";
import { auth } from "../_lib/auth";
import Empty from "./Empty";
import PageHeading from "./PageHeading";
import UserItemList from "./UserItemList";

async function FollowersFollowingContainer({ items, label, icon, following }) {
  const session = await auth();

  return (
    <div className="bg-lightDark py-6 px-4 md:p-8 rounded-md shadow-sm shadow-blue ">
      <PageHeading  label={label}>
        {icon}
      </PageHeading>
      {!items.length ? (
        <Empty resource={label} container={true} icon={<UsersIcon className="size-14" />} />
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
