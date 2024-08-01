"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { z, ZodError } from "zod";
import { follow, unfollow } from "../_services/follows";
import { deleteUser, updateSettings } from "../_services/settings";
import { auth, signIn, signOut } from "./auth";
import {
  addComment,
  createPost,
  deletePost,
  editPostById,
  getPostLikes,
  updateBookMarks,
  updateLikes,
  uploadPhoto,
} from "./services";

export const signUpAction = async () => {
  await signIn("google", {
    redirectTo: "/",
  });
};

export const signOutAction = async () => {
  console.log("as");

  await signOut({
    redirectTo: "/login",
  });
};

export const createPostAction = async (formData) => {
  const file = formData.get("image");
  const text = formData.get("text");
  console.log(file);
  try {
    if (!file.size > 0 && !text.trim()) {
      throw new Error("Please upload a photo or add content.");
    }

    let uploadedPhoto = null;
    if (file && file.name && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      uploadedPhoto = await uploadPhoto(file, filePath);
    }

    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Authentication failed. Please log in again.");
    }

    await createPost(text, session.user.userId, uploadedPhoto);
    revalidatePath("/");

    return {
      resetKey: Math.random(),
      error: false,
    };
  } catch (error) {
    console.error("Error in createPostAction:", error);
    return {
      error: true,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
export const changeLikeAction = async (formData) => {
  const session = await auth();
  const postLike = formData.get("post");
  console.log("postLike", postLike);
  const [postId, liked] = postLike.split("%");
  let likes = await getPostLikes(postId);

  if (Number(liked)) likes = likes.filter((id) => session.user.userId !== id);
  else likes.push(session.user.userId);

  await updateLikes(likes, postId);

  revalidatePath("/");
};

export const changeBookMarkAction = async (formData) => {
  const session = await auth();
  const postBookMark = formData.get("post");
  const [postId, bookmarked] = postBookMark.split("%");
  let bookmarks = session.user.bookmarks;
  const userId = session.user.userId;

  if (Number(bookmarked)) bookmarks = bookmarks.filter((id) => +postId !== id);
  else bookmarks.push(postId);

  await updateBookMarks(bookmarks, userId);

  revalidatePath("/");
  revalidatePath("/bookmarks");
};

export const deletePostAction = async (formData) => {
  const postId = formData.get("postId");
  await deletePost(postId);
  revalidatePath("/");
};

export const addCommentAction = async (formData) => {
  const text = formData.get("text");
  const postId = Number(formData.get("postId"));
  const session = await auth();
  const userId = session.user.userId;

  await addComment(text, userId, postId);

  revalidatePath("/");
  revalidatePath(`profile/posts/${postId}`);

  return {
    message: "Comment added successfully",
  };
};

export const editPostAction = async (post, formData, imageExisted) => {
  const file = formData.get("image");
  const text = formData.get("text");
  const imageDeleted = formData.get("image_deleted");
  let uploadedPhoto = null;

  // Check if there are no changes to submit
  if (!text && !imageExisted) return;

  // Handle file upload if a new file is provided
  if (file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    uploadedPhoto = await uploadPhoto(file, filePath);
  }

  // Construct the updated data object
  let updatedData = {
    text: text,
  };

  // Conditionally add the image property
  if (!imageExisted && (uploadedPhoto || imageDeleted)) {
    updatedData.image = uploadedPhoto ? uploadedPhoto : null;
  }

  // Update the post by its ID with the updated data
  await editPostById(post.id, updatedData);

  // Revalidate paths to ensure the updated post is fetched
  revalidatePath("/");
  revalidatePath(`/post/${post.id}/edit`);
};

const settingsSchema = z.object({
  fullName: z
    .string({
      message: "Full name must be string",
    })
    .max(25, {
      message: "Full Name is between (6,25) letters",
    })
    .min(6, {
      message: "Full Name is between (6,25) letters",
    })
    .regex(/^(?!\d+$).*/, {
      message: "Full Name cannot be only digits",
    }),

  bio: z.coerce
    .string({
      message: "Bio must be String",
    })
    .max(60, {
      message: "Bio is between (6,25) letters",
    })
    .min(6, {
      message: "Bio is between (6,25) letters",
    })
    .regex(/^(?!\d+$).*/, {
      message: "Full Name cannot be only digits",
    }),
});

export const updateSettingsAction = async (prevState, formData) => {
  try {
    const fullName = formData.get("fullName");
    const bio = formData.get("bio");
    const id = formData.get("id");

    const validated = settingsSchema.parse({
      fullName,
      bio,
      id,
    });

    await updateSettings(id, validated);
  } catch (err) {
    if (err instanceof ZodError) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      return { message: "", ...validationErrors };
    } else
      return {
        message: "error while update settings",
        fullName: "",
        bio: "",
      };
  }
  redirect("/profile");
};

export const deleteAccountAction = async () => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  await deleteUser(session.user.userId);
  redirect("/");
};

export const changeFollowings = async (formData) => {
  const followingUser = Number(formData.get("userId"));
  const session = await auth();
  const followerUser = session.user.userId;
  const following = session.user.following;
  if (followingUser === followerUser) throw new Error("This Not Allowed!");
  const followed = following.find(
    (user) => user.following_id === followingUser.id
  );
  console.log(followed);
  if (followed) {
    await unfollow(followerUser, followingUser);
  } else {
    await follow(followerUser, followingUser);
  }

  revalidatePath("/following");
  revalidatePath(`/profile/${followingUser}/followers`);
  revalidatePath(`/profile/${followerUser}/following`);
  revalidatePath(`/profile/${followerUser}`);
  revalidatePath(`/profile/${followingUser}`);
};
