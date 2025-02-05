"use client";
import { deleteNoteFromDb } from "@/app/actions/delete_notes";
import { TrashIcon } from "lucide-react";
import { useActionState } from "react";
import { useState } from "react";

interface DeleteNoteButtonProps {
  note_id: string;
}

export default function DeleteNoteButton({ note_id }: DeleteNoteButtonProps) {
  const [, formAction, isPending] = useActionState(
    deleteNoteFromDb,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as any,
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };
  return (
    <>
      <div>
        <button 
          type="button" 
          onClick={handleDeleteClick} 
          disabled={isPending}
          aria-label="Delete note"
        >
          <TrashIcon size={20} />
        </button>
      </div>

      {showConfirm && (
        <form 
          action={formAction} 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          data-testid="delete-form"
        >
          <input hidden name="id" defaultValue={note_id} />
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[320px]">
            <h3 className="text-xl font-semibold mb-3">Confirm Delete</h3>
            <p className="text-gray-600">Are you sure you want to delete this note?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="mr-2 bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
