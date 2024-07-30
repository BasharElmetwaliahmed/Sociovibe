import { useSession } from "next-auth/react";
import UserItemList from "./UserItemList";

 function SearchFriends({ users }) {
  
  const session = useSession();

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
