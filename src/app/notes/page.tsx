import { redirect } from "next/navigation";

import { auth } from "#/auth";
import ListNotes from "@/components/ListNotes";
import { getSupabaseClient } from "@/lib/supabase-client";
import CreateNoteButton from "@/components/CreateNoteButton";
import Pagination from "@/components/Pagination";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let page = params.page;

  if (page === undefined) {
    page = "1";
  }

  const session = await auth();
  if (!session?.user.id) {
    redirect("/login");
  } else {
    const supabase = await getSupabaseClient(session);

    const pageModifier = 5 * (Number(page) - 1);

    const { count, data, error } = await supabase
      .from("notes")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(0 + pageModifier, 4 + pageModifier);

    if (error || (data && data.length === 0)) {
      return (
        <div className="mt-32 flex flex-col justify-center items-center ">
          <h1 className="text-center font-bold text-3xl">Notes</h1>

          <CreateNoteButton />
          <ListNotes notes={[]} />
          <Pagination totalPages={Math.ceil(count! / 5) || 1} />
        </div>
      );
    }
    if (data && data.length > 0 && count !== null) {
      return (
        <div className="mt-32 flex flex-col justify-center items-center ">
          <h1 className="text-center font-bold text-3xl">Notes</h1>
          <CreateNoteButton />
          <ListNotes notes={data} />
          <Pagination totalPages={Math.ceil(count! / 5)} />
        </div>
      );
    }
  }
}
