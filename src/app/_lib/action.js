"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
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

export const createPostAction = async (state, formData) => {
  const file = formData.get("image");

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;
  let uploadedPhoto;
  if (file.name) uploadedPhoto = await uploadPhoto(file, filePath);
  const session = await auth();
  const text = formData.get("text");
  if (text.trim() === "" && !uploadedPhoto) return;
  await createPost(text, session.user.userId, uploadedPhoto);
  revalidatePath("/");

  return {
    ...state,
    resetKey: Math.random(),
  };
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
  console.log(userId, bookmarked, postId);

  if (Number(bookmarked)) bookmarks = bookmarks.filter((id) => +postId !== id);
  else bookmarks.push(postId);

  await updateBookMarks(bookmarks, userId);

  revalidatePath("/");
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
};

export const editPostAction = async (post, formData) => {
  const file = formData.get("image");
  const text = formData.get("text");
  const imageDeleted = formData.get("image_deleted");
  let uploadedPhoto = null;

  // Check if there are no changes to submit
  if (!text && !file.size && imageDeleted) return;

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
  if (uploadedPhoto || imageDeleted) {
    updatedData.image = uploadedPhoto ? uploadedPhoto : null;
  }

  // Update the post by its ID with the updated data
  await editPostById(post.id, updatedData);

  // Revalidate paths to ensure the updated post is fetched
  revalidatePath("/");
  revalidatePath(`/post/${post.id}/edit`);
  redirect("/");
};

const settingsSchema = z.object({
  fullName: z.coerce
    .string({
      message: "Full name must be string",
    })
    .max(25, {
      message: "Full Name is between (6,25) letters",
    })
    .min(6, {
      message: "Full Name is between (6,25) letters",
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
    }),
});

export const updateSettingsAction = async (formData) => {
  const fullName = formData.get("fullName");
  const bio = formData.get("bio");
  const validated = settingsSchema.safeParse({
    fullName,
    bio,
  });
  console.log(validated.error.errors.flat());
};
