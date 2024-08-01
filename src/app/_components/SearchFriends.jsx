import { MagnifyingGlassCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Empty from "./Empty";
import PageHeading from "./PageHeading";
import UserItemList from "./UserItemList";

 function SearchFriends({ users }) {
  
  const session = useSession();
  if(users.length==0) return <Empty icon={<UserCircleIcon/>} resource={'users'} />

  return (
    <div className="relative z-10">
      <PageHeading label={'Search Friends'}><MagnifyingGlassCircleIcon/></PageHeading>
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
