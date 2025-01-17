"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getSupabaseClient } from "@/lib/supabase-client";
import { auth } from "#/auth";

export async function deleteNoteFromDb(
  prevState: Object | undefined,
  formData: FormData,
) {
  const deleteSchema = z.object({
    id: z.string(),
  });
  const result = deleteSchema.safeParse({ id: formData.get("id") });
  if (!result.success) {
    console.error("Invalid form data:", result.error);
    return { success: false, error: "Invalid form data" };
  }
  console.log("Delete note:", result.data);
  try {
    const session = await auth();
    const supabaseClient = await getSupabaseClient(session);
    const { error } = await supabaseClient
      .from("notes")
      .delete()
      .eq("id", result.data.id);

    if (error) {
      console.error("Error deleting note:", error);
      return { success: false, error: "Failed to delete note" };
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    return { success: false, error: "Failed to delete note" };
  } finally {
    revalidatePath("/notes");
  }
}
