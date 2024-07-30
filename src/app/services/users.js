import { notFound } from "next/navigation";
import supabase from "../_lib/supabase";
export const getUser = async (id) => {
  const { data } = await supabase
    .from("users")
    .select("fullName")
    .eq("id", id)
    .single();
  console.log(data,'user');
  if (!data) notFound();

  return data;
};
