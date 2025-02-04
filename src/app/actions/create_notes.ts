"use server";

import { getSupabaseClient } from "@/lib/supabase-client";
import { auth } from "#/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNoteToDb() {
  let id = null;
  try {
    const session = await auth();
    const supabaseClient = await getSupabaseClient(session);
    const { error, statusText, data } = await supabaseClient
      .from("notes")
      .insert({
        user_id: session?.user?.id || '',
        content: `# New Note`,
      })
      .select();

    if (error) {
      console.error("Error saving note:", error);
      return { success: false, error: "Failed to save note" };
    }

    if (statusText === "Created") {
      id = data[0]?.id;
    }
  } catch (error) {
    console.error("Error saving note:", error);
    return { success: false, error: "Failed to save note" };
  } finally {
    revalidatePath("/notes");
    if (id !== null) {
      redirect(`/notes/${id}/edit`);
    }
  }
}
