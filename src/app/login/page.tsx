export default async function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form className="flex flex-col gap-4 pb-20">
        <label>
          <input
            className="p-2 rounded min-w-[300px]"
            type="text"
            name="username"
            placeholder="Username"
          />
        </label>
        <label>
          <input
            className="p-2 rounded min-w-[300px]"
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <button
          className=" font-bold text-xl text-orange-100 bg-[#9A8C98] p-1  rounded"
          type="submit"
        >
          Log in
        </button>
      </form>
    </main>
  );
}
