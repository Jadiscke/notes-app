import { auth } from "#/auth";

import { getSupabaseClient } from "@/lib/supabase-client";

export default async function Page() {
  const session = await auth();
  const supabase = await getSupabaseClient(session);
  const { data, error } = await supabase.from("users").select("*");
  console.log(error);
  console.log(data);
  return(
    <div className="m-20 text-3xl">
      <h1>Notes</h1>
    </div>,
  );
}
