import { auth } from "../_lib/auth";
import { searchUsers } from "../_lib/services";
import UserItemList from "./UserItemList";

async function SearchFriends({ search }) {
  const users = await searchUsers(search);
  
  const session = await auth();

  return (
    <div>
      <h2 className="text-white text-3xl font-extrabold">Search Friends</h2>
      <div className="flex flex-col gap-2 my-8">
        {users.map((user) => (
          <UserItemList
            key={user.id}
            following={session.user.following}
            userId={session.user.userId}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchFriends;
