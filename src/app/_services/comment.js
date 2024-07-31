import supabase from "../_lib/supabase";


/**
 * Adds a comment to a post.
 */
export const addComment = async (comment, user_id, post_id) => {
  try {
    const { error } = await supabase
      .from("comments")
      .insert([{ text: comment, user_id, post_id }])
      .select();

    if (error) throw error;
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

/**
 * Retrieves the first two comments of a post.
 */
export const getFirstTwoComments = async (post_id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*, user:users(fullName, avatar)")
      .eq("post_id", post_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching first two comments:", error);
    return null;
  }
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