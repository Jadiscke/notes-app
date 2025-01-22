import { auth } from "#/auth";
import BackButton from "@/components/BackButton";
import EditNote from "@/components/EditNote";

import { getSupabaseClient } from "@/lib/supabase-client";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
  path: Promise<string>;
}) {
  redirect;
  const id = (await params).id;
  const session = await auth();
  const supabase = await getSupabaseClient(session);
  const { data, error } = await supabase.from("notes").select("*").eq("id", id);

  if (error) {
    return <div>Note not found</div>;
  }

  return (
    <div className="mt-32 flex flex-col justify-center items-center w-full px-4">
      <div className="flex flex-row justify-start w-full lg:max-w-[1050px] ">
        <BackButton />
      </div>
      <p>
        {data[0].updated_at.slice(0, 10) +
          " " +
          data[0].updated_at.slice(11, 16)}
      </p>
      <div className="w-full lg:max-w-[1050px]">
        <EditNote noteId={data[0].id} content={data[0].content} />
      </div>
    </div>
  );
}
