import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabase-client";
import { auth } from "#/auth";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

async function getProfileData() {
  const session = await auth();
  const supabase = await getSupabaseClient(session);
  const { data, error } = await supabase.from("users").select("*");
  
  if (error) throw error;
  return data as User[];
}

export default async function ProfilePage() {
  try {
    const users = await getProfileData();
    const user = users[0];

    if (!user) {
      return (
        <div className="m-28 flex flex-col items-center">
          <p>No profile data found.</p>
        </div>
      );
    }

    return (
      <div className="m-36 flex flex-col gap-10 items-center">
        <Image
          src={user.image}
          width={200}
          height={200}
          alt={`${user.name}'s profile image`}
          className="rounded-full"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="m-28 flex flex-col items-center text-red-600">
        <p>An error occurred while fetching the profile.</p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-sm mt-2">{(error as Error).message}</p>
        )}
      </div>
    );
  }
}
