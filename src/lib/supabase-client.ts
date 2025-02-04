import { createClient } from "@supabase/supabase-js";
import { Database } from "#/database.types";
import type { Session } from "next-auth";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export async function getSupabaseClient(
  session: Session | null,
): Promise<ReturnType<typeof createClient<Database>>> {
  if (!session) {
    const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    return supabase;
  }
  const { supabaseAccessToken } = session;

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
  return supabase;
}
