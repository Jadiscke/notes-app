import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabase-client";
import { auth } from "#/auth";

export default async function Page() {
  const session = await auth();
  const supabase = await getSupabaseClient(session);
  const { data, error } = await supabase.from("users").select("*");
  if (error || (data && data.length === 0)) {
    return (
      <div className="m-28 flex flex-col items-center">
        <p>An error occurred while fetching the profile.</p>
      </div>
    );
  }
  if (data && data.length > 0 && data[0]) {
    return (
      <div className="m-28 flex flex-col gap-10 items-center">
        <h1 className="text-4xl">Profile</h1>
        <Image
          src={data[0].image!}
          width={200}
          height={200}
          alt="profile image"
        />
        <p>{data[0].name}</p>
        <p>{data[0].email}</p>
      </div>
    );
  }
}
