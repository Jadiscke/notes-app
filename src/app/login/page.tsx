import { GithubIcon } from "lucide-react";
import { signIn } from "#/auth";

const githubLogin = async () => {
  "use server";
  await signIn("github", { redirectTo: "/notes" });
};

export default async function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form
        className="flex flex-col justify-center gap-4 p-10 min-h-[300px] rounded-lg bg-[#c9ada7] shadow-sm shadow-gray-700"
        action={githubLogin}
      >
        <button
          className="flex flex-row gap-4 items-center font-bold text-xl text-[#22223b] bg-[#f2e9e4] p-4  rounded"
          type="submit"
        >
          Sign in with Github
          <div className="rounded-full border-[#22223b] border-2 p-1">
            <GithubIcon />
          </div>
        </button>
      </form>
    </main>
  );
}
