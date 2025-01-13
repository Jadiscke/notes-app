import { createClient } from "@supabase/supabase-js";
import { Database } from "#/database.types";
import { auth } from "#/auth";
import { AdapterSession, AdapterUser } from "next-auth/adapters";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export async function getSupabaseClient(
  session: any,
): Promise<ReturnType<typeof createClient>> {
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
