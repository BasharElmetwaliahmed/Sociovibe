import SearchFriends from "@/app/_components/SearchFriends";
import UserItemList from "@/app/_components/UserItemList";
import { auth } from "@/app/_lib/auth";
import React from "react";

async function Page({ searchParams }) {
  const session = await auth();
  const following = session.user.following;
  return (
    <div>
      {searchParams?.search ? (
        <SearchFriends search={searchParams.search} />
      ) : (
        <div className="bg-lightDark p-8 rounded-md shadow-sm shadow-blue min-h-[500px]">
          <h2 className="text-white text-3xl font-extrabold">Following</h2>
          <div className="flex flex-col gap-2 my-8">
            {following.map((user) => (
              <UserItemList
                key={user.following_id}
                user={{
                  id: user.following_id,
                  avatar: user.users.avatar,
                  fullName: user.users.fullName,
                }}
                following={following}
                userId={session.user.userId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
