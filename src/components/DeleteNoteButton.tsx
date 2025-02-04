"use client";
import { deleteNoteFromDb } from "@/app/actions/delete_notes";
import { TrashIcon } from "lucide-react";
import { useActionState } from "react";

interface DeleteNoteButtonProps {
  note_id: string;
}

export default function DeleteNoteButton({ note_id }: DeleteNoteButtonProps) {
  const [, formAction, isPending] = useActionState(
    deleteNoteFromDb,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as any,
  );

  return (
    <form action={formAction}>
      <input hidden name="id" defaultValue={note_id} />
      <button type="submit" disabled={isPending}>
        <TrashIcon size={20} />
      </button>
    </form>
  );
}
