import supabase from "../_lib/supabase";

export const updateSettings = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("users")
    .update({ ...updatedData })
    .eq("id", id);
  if (error) console.error(error);

  return data;
};

export const deleteUser = async (id) => {
  await supabase.from("users").delete().eq("id", id);
};
