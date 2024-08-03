import { notFound } from "next/navigation";
import supabase from "../_lib/supabase";

// Function to get a user by their email
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }

  return data;
};

// Function to get a user by their ID
export const getUser = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("fullName")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
  

  if (!data) {
   return notFound();
  }

  return data;
};

export const createUser = async (data) => {
  try {
    const { error } = await supabase.from("users").insert(data);

    if (error) throw error;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

/**
 * Searches for users by full name.
 */
export const searchUsers = async (search) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .ilike("fullName", `%${search}%`);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error searching users by full name:", error);
    return null;
  }
};
