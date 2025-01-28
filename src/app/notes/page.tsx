import { redirect } from "next/navigation";

import { auth } from "#/auth";
import ListNotes from "@/components/ListNotes";
import { getSupabaseClient } from "@/lib/supabase-client";
import CreateNoteButton from "@/components/CreateNoteButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

const ITEMS_PER_PAGE = 5;

interface SearchParams {
  page?: string;
  search?: string;
}

async function fetchNotes(supabase: any, page: string, search: string) {
  const pageOffset = ITEMS_PER_PAGE * (Number(page) - 1);
  return await supabase
    .from("notes")
    .select("*", { count: "exact" })
    .ilike("content", `%${search}%`)
    .order("created_at", { ascending: false })
    .range(pageOffset, pageOffset + ITEMS_PER_PAGE - 1);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const search = params.search ?? "";

  const session = await auth();
  if (!session?.user.id) {
    redirect("/login");
  }

  const supabase = await getSupabaseClient(session);
  const { count, data, error } = await fetchNotes(supabase, page, search);

  return (
    <div className="mt-32 flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-3xl">Notes</h1>
      <div className="grid grid-cols-[1fr_50px] gap-4 items-center justify-center w-full lg:max-w-[1050px]">
        <SearchBar />
        <CreateNoteButton />
      </div>
      <ListNotes notes={error || !data ? [] : data} />
      <Pagination totalPages={Math.ceil((count ?? 0) / ITEMS_PER_PAGE)} />
    </div>
  );
}
