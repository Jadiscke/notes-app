const githubLogin = async () => {
  "use server";
  await signIn("github");
};

import { signIn } from "#/auth";

export default async function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form className="flex flex-col gap-4 pb-20" action={githubLogin}>
        <button
          className=" font-bold text-xl text-orange-100 bg-[#9A8C98] p-1  rounded"
          type="submit"
        >
          Log in with Github
        </button>
      </form>
    </main>
  );
}
