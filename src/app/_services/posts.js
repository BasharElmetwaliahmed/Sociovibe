import supabase from "../_lib/supabase";

/**
 * Creates a new post.
 */
export const createPost = async (text, user_id, image) => {
  try {
    const { error } = await supabase
      .from("posts")
      .insert([{ text, user_id, likes: [], image }])
      .select();

    if (error) {
      throw new Error("Error inserting post: " + error.message);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves all posts ordered by creation date.
 */
export const getPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        user_id,
        users(
          fullName,
          avatar
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Error fetching posts: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Retrieves posts by a specific user.
 */
export const getUserPostsById = async (user_id, image = false) => {
  let selectData = image
    ? "id, image"
    : "id, created_at, text, image, users(fullName, avatar), likes";

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(selectData)
      .eq("user_id", user_id)
      .limit(image ? 10 : undefined);

    if (error) {
      throw new Error("Error fetching user posts: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Retrieves a specific post by ID.

 */
export const getPostById = async (post_id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        created_at,
        text,
        image,
        user_id,
        users(fullName, avatar),
        likes
      `
      )
      .eq("id", post_id)
      .single();

    if (error) {
      throw new Error("Error fetching post: " + error.message);
    }

    if (!data) {
      throw new Error("Post not found");
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Deletes a post by ID.

 */
export const deletePost = async (postId) => {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      throw new Error("Error deleting post: " + error.message);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves posts based on bookmarks.
 */
export const getBookmarks = async (bookMarks) => {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        user_id,
        users(
          fullName,
          avatar
        )
      `
      )
      .in("id", bookMarks);

    if (error) {
      throw new Error("Error fetching bookmarks: " + error.message);
    }

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Retrieves the likes of a specific post.
 */
export const getPostLikes = async (postId) => {
  try {
    const {
      data: { likes },
      error,
    } = await supabase.from("posts").select("likes").eq("id", postId).single();

    if (error) {
      throw new Error("Error fetching post likes: " + error.message);
    }

    return likes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Updates the likes for a specific post.
 */
export const updateLikes = async (likes, postId) => {
  try {
    const { error } = await supabase
      .from("posts")
      .update({ likes })
      .eq("id", postId);

    if (error) {
      throw new Error("Error updating post likes: " + error.message);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Updates the bookmarks for a specific user.
 */
export const updateBookMarks = async (bookmarks, userId) => {
  try {
    const { error } = await supabase
      .from("users")
      .update({ bookmarks })
      .eq("id", userId);

    if (error) {
      throw new Error("Error updating bookmarks: " + error.message);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Edits a post by ID.
 */
export const editPostById = async (post_id, updatedData) => {
  console.log('editaa')
  try {
    const { error } = await supabase
      .from("posts")
      .update({ ...updatedData })
      .eq("id", post_id);

    if (error) {
      throw new Error("Error updating post: " + error.message);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves the count of comments for a specific post.

 */
export const getCommentsCount = async (postId) => {
  try {
    const { count, error } = await supabase
      .from("comments")
      .select("*", { count: "exact" })
      .eq("post_id", postId);

    if (error) {
      throw new Error("Error fetching comments count: " + error.message);
    }

    return count;
  } catch (error) {
    console.error(error);
    return null;
  }
};
