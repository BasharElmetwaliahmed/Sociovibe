import { auth } from "../_lib/auth";

export const changeFollowings = async (formData) => {
  const followingUser = Number(formData.get("userId"));
  const session = await auth();
  const followerUser = session.user.userId;
  const following = session.user.following;
  const followed = following.find(
    (user) => user.following_id === followingUser
  );
  if (followed) {
    await unfollow(followerUser, followingUser);
  } else {
    await follow(followerUser, followingUser);
  }

  revalidatePath("/friends");
};

// Add other auth-related functions here
