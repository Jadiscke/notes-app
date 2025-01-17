"use server";

import { getSupabaseClient } from "@/lib/supabase-client";
import { auth } from "#/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNoteToDb(
  prevState: Object | undefined,
  formData: FormData,
) {
  try {
    const session = await auth();
    const supabaseClient = await getSupabaseClient(session);
    const { error, statusText } = await supabaseClient.from("notes").insert({
      user_id: session?.user.id!,
      content: `
# New Note
## this is a test
Lets go

E ninguem agora vai me amedrontar.

Minha imaganicao me da forças pra voar.

tarantantan.
`,
    });
    if (error) {
      console.error("Error saving note:", error);
      return { success: false, error: "Failed to save note" };
    }

    if (statusText === "Created") {
      return { success: true };
    }
  } catch (error) {
    console.error("Error saving note:", error);
    return { success: false, error: "Failed to save note" };
  } finally {
    revalidatePath("/notes");
  }
}
