"use server";
import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import supabase from "./supabase";

export const getUser = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) console.error("error aa");

  return data;
};
export const createUser = async (data) => {
  const { error } = await supabase.from("users").insert(data);
  if (error) console.error(error);
};

export const searchUsers = async (search) => {
  const { data, error } = await supabase.from("users").select("*");
  // .eq("fullName", search);
  if (error) console.error(error);

  return data;
};


export const getFollowers = async (userId, fullData = false, top = false) => {
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

  return followersDetails
};
export const getFollowing = async (userId, fullData = true, top = false) => {
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

const follow = async (followerId, followingId) => {
  const { error } = await supabase
    .from("following")
    .insert([{ follower_id: followerId, following_id: followingId }]);
  if (error) {
    console.error(error);
    console.error("error while follow,aaa");
  }
};
const unfollow = async (followerId, followingId) => {
  const { error } = await supabase
    .from("following")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
  console.log(error, "aaaaaaaaaaaaaaaaaa");
  if (error) console.error("error while unfollow");
};

export const getFollowings = async () => {
  const session = await auth();
  const { data: followings, error: followingsError } = await supabase
    .from("users")
    .select("*")
    .in("id", session.user.following);

  if (followingsError) {
    console.error("Error fetching followings details:", followingsError);
    return null;
  }

  return followings;
};

export const createPost = async (text, user_id, image) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ text, user_id, likes: [], image }])
    .select();

  if (error) {
    console.error(error);
    console.error("Error inserting post");
  }
};

export const getPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      user_id,
      users(
        fullName,
        avatar)
    `
    )
    .order("created_at", { ascending: false });

  if (error) console.error(error);
  return data;
};

export const uploadPhoto = async (file, filePath) => {
  let { error } = await supabase.storage.from("posts").upload(filePath, file);
  if (error) throw console.error(error);
  let { data: url } = supabase.storage.from("posts").getPublicUrl(filePath);

  return url.publicUrl;
};

export const getPostLikes = async (postId) => {
  const {
    data: { likes },
    error,
  } = await supabase.from("posts").select("likes").eq("id", postId).single();

  return likes;
};

export const updateLikes = async (likes, postId) => {
  await supabase.from("posts").update({ likes }).eq("id", postId);
};
export const updateBookMarks = async (bookmarks, userId) => {
  console.log(bookmarks);
  const { error } = await supabase
    .from("users")
    .update({ bookmarks })
    .eq("id", userId);
  if (error) console.log(error);
};

export const deletePost = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);
    if(error) console.log(error);
};

export const addComment = async (comment, user_id, post_id) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ text: comment, user_id, post_id }])
    .select();
  if (error) console.log(error);
};

export const getFirstTwoComments = async (post_id) => {
  let { data, error } = await supabase
    .from("comments")
    .select("*, user:users(fullName, avatar)")
    .eq("post_id", post_id)
    .order("created_at", { ascending: false });

  return data;
};
export const getUserPostsById = async (user_id, image) => {
  let selectData = "";
  if (image) {
    selectData = `id, image`;
  } else {
    selectData = `id, created_at, text, image, users(fullName, avatar), likes`;
  }

  let query = supabase.from("posts").select(selectData).eq("user_id", user_id);

  if (image) {
    query = query.limit(10);
  }

  const { data, error } = await query;
  if (error) {
    console.log(error);
  }

  return data;
};

export const getPostById = async (post_id) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      ` id,
          created_at,
          text,
          image,
          users(fullName, avatar),
          likes
        `
    )
    .eq("id", post_id)
    .single();
  if (error) console.log(error);

  return data;
};

export const editPostById = async (post_id, updatedData) => {
  console.log(updatedData);
  const { data, error } = await supabase
    .from("posts")
    .update({ ...updatedData })
    .eq("id", post_id);
  if (error) console.log(error);
};

export async function getCommentsCount(postId) {
  const { data, error, count } = await supabase
    .from("comments")
    .select("*", { count: "exact" })
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching comments count:", error);
    return null;
  }

  return count;
}

export async function getBookmarks(bookMarks) {
  const { data: posts, error: error } = await supabase
    .from("posts")
    .select(
      `
      *,
      user_id,
      users(
        fullName,
        avatar)
    `
    )
    .in("id", bookMarks);

  if (error) {
    console.error("Error fetching bookmarks");
    return [];
  }
  return posts;
}

export const getUserProfileWithStats = async (userId) => {
  const { data, error } = await supabase.rpc("get_user_profile_with_stats", {
    user_id: +userId,
  });

  if (error) {
    console.error("Error fetching user profile with stats:", error);
    return null;
  }

  return data[0];
};
