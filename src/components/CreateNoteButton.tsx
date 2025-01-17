"use client";

import { createNoteToDb } from "@/app/actions/create_notes";
import { PlusIcon } from "lucide-react";
import { useActionState } from "react";

export default function CreateNoteButton() {
  const [formState, formAction, isPending] = useActionState(
    createNoteToDb,
    {} as any,
  );
  return (
    <form
      action={formAction}
      className="pr-4 pb-4 w-full lg:max-w-[800px] flex flex-row justify-end"
    >
      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white p-2 rounded"
      >
        <PlusIcon size={20} />
      </button>
    </form>
  );
}
