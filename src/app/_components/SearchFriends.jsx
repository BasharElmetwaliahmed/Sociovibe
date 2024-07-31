import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Empty from "./Empty";
import UserItemList from "./UserItemList";

 function SearchFriends({ users }) {
  
  const session = useSession();
  if(users.length==0) return <Empty icon={<UserCircleIcon/>} resource={'users'} />

  return (
    <div>
      <h2 className="text-white text-3xl font-extrabold">Search Friends</h2>
      <div className="flex flex-col gap-2 my-8">
        {users.map((user) => (
          <UserItemList
            key={user.id}
            following={session.data.user.following}
            userId={session.data.user.userId}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchFriends;
