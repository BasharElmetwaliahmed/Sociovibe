// services/index.js
export {
  createPost,
  getPosts,
  getUserPostsById,
  getPostById,
  deletePost,
  getBookmarks,
  getPostLikes,
  updateLikes,
  updateBookMarks,
  editPostById,
  getCommentsCount,
} from "@/app/_services/posts";
export {
  getFollowers,
  getFollowing,
  changeFollowings,
  getFollowings,
} from "@/app/_services/follows";
export { addComment, getFirstTwoComments } from "@/app/_services/comment";
export { getUserByEmail, createUser, searchUsers } from "@/app/_services/users";
import supabase from "./supabase";

export const uploadPhoto = async (file, filePath) => {
  let { error } = await supabase.storage.from("posts").upload(filePath, file);
  if (error) throw console.error(error);
  let { data: url } = supabase.storage.from("posts").getPublicUrl(filePath);

  return url.publicUrl;
};

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
