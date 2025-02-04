"use server";

import { getSupabaseClient } from "@/lib/supabase-client";
import { auth } from "#/auth";
import { revalidatePath } from "next/cache";

export async function saveNoteToDb(noteId: string, newContent: string) {
  try {
    const session = await auth();
    const supabaseClient = await getSupabaseClient(session);
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    const { error, statusText } = await supabaseClient
      .from("notes")
      .update({ content: newContent, updated_at: new Date().toISOString() })
      .match({ id: noteId, user_id: userId });

    if (error) {
      console.error("Error saving note:", error);
      return { success: false, error: "Failed to save note" };
    }

    console.log("Status Text", statusText);

    return { success: true, error: null };
  } catch (error) {
    console.error("Error saving note:", error);
    return { success: false, error: "Failed to save note" };
  } finally {
    revalidatePath("/notes");
  }
}
