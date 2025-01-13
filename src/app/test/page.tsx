import { auth } from "#/auth";
import { getSupabaseClient } from "@/lib/supabase-client";

export default async function Page() {
  const session = await auth();
  const supabase = await getSupabaseClient(session);
  const { data, error } = await supabase
    .schema("next_auth")
    .from("users")
    .select("*");
  console.log(error);
  console.log(data);
  console.log(session);
  return (
    <div>
      <h1>Test Page</h1>
      {!session && <p>You are not logged in</p>}
    </div>
  );
}
