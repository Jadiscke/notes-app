import { redirect } from "next/navigation";

import { auth } from "#/auth";
import ListNotes from "@/components/ListNotes";
import { getSupabaseClient } from "@/lib/supabase-client";
import CreateNoteButton from "@/components/CreateNoteButton";

export default async function Page() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/login");
  } else {
    const supabase = await getSupabaseClient(session);
    const { data, error } = await supabase.from("notes").select("*");
    if (error || (data && data.length === 0)) {
      return (
        <div className="mt-32 flex flex-col justify-center items-center ">
          <h1 className="text-center font-bold text-3xl">Notes</h1>

          <CreateNoteButton />
          <ListNotes notes={[]} />
        </div>
      );
    }
    if (data && data.length > 0) {
      return (
        <div className="mt-32 flex flex-col justify-center items-center ">
          <h1 className="text-center font-bold text-3xl">Notes</h1>
          <CreateNoteButton />
          <ListNotes notes={data} />
        </div>
      );
    }
  }
}
