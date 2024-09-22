'use server'
import supabase from "../_lib/supabase";
import { getUser } from "./users";
import { auth } from "../_lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Retrieves the followers of a user.
 */
export const getFollowers = async (userId, fullData = false, top = false) => {
  await getUser(userId);
 
  let query = supabase
    .from("following")
    .select("follower_id")
    .eq("following_id", userId);

  if (top) {
    query = query.limit(10);
  }

  const { data: followers, error: followersError } = await query;

  if (followersError) {
    console.error("Error fetching follower IDs:", followersError);
    return null;
  }

  if (!fullData) {
    return followers;
  }

  const followerIds = followers.map((follower) => follower.follower_id);

  const { data: followersDetails, error: detailsError } = await supabase
    .from("users")
    .select("id, fullName, avatar")
    .in("id", followerIds);

  if (detailsError) {
    console.error("Error fetching followers details:", detailsError);
    return null;
  }

  return followersDetails;
};

/**
 * Retrieves the users that a user is following.
 */
export const getFollowing = async (userId, fullData = true, top = false) => {
  await getUser(userId);

  let query = supabase
    .from("following")
    .select("following_id")
    .eq("follower_id", userId);

  if (top) {
    query = query.limit(10);
  }

  const { data: following, error: followingError } = await query;

  if (followingError) {
    console.error("Error fetching following IDs:", followingError);
    return null;
  }

  if (!fullData) {
    return following;
  }

  const followingIds = following.map((follow) => follow.following_id);

  const { data: followingDetails, error: detailsError } = await supabase
    .from("users")
    .select("id, fullName, avatar")
    .in("id", followingIds);

  if (detailsError) {
    console.error("Error fetching following details:", detailsError);
    return null;
  }

  return followingDetails;
};


 /** Changes the follow status of a user.**/
 
export const changeFollowings = async (formData) => {
  const followingUser = Number(formData.get("userId"));
  const session = await auth();
  const followerUser = session.user.userId;
  const following = session.user.following;
  const followed = following.find(
    (user) => user.id === followingUser
  );
  console.log(followed,followerUser,following)

  if (followed) {
    await unfollow(followerUser, followingUser);
  } else {
    await follow(followerUser, followingUser);
  }

  revalidatePath("/friends");
};

/**
 * Follows a user.
 */
export const follow = async (followerId, followingId) => {
  console.log(followerId)
  try {
    const { error } = await supabase
      .from("following")
      .insert([{ follower_id: followerId, following_id: followingId }]);
      console.log('hello')

    if (error) throw error;
  } catch (error) {
    console.error("Error while following:", error);
  }
};

/**
 * Unfollows a user.
 */
export const unfollow = async (followerId, followingId) => {
  try {
    const { error } = await supabase
      .from("following")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId);

    if (error) throw error;
  } catch (error) {
    console.error("Error while unfollowing:", error);
  }
};

/**
 * Retrieves the followings of the current user.
 */
export const getFollowings = async () => {
  try {
    const session = await auth();
    const { data: followings, error: followingsError } = await supabase
      .from("users")
      .select("*")
      .in("id", session.user.following);

    if (followingsError) throw followingsError;

    return followings;
  } catch (error) {
    console.error("Error fetching followings details:", error);
    return null;
  }
};
