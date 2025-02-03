"use client";

import { createNoteToDb } from "@/app/actions/create_notes";
import { PlusIcon } from "lucide-react";
import { useActionState } from "react";
import React from "react";

export default function CreateNoteButton() {
  const [state, formAction, isPending] = useActionState(
    createNoteToDb,
    {} as { success: boolean, error: string },
  );
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (state && state.success === false) {
      setShowError(true);
    }
  }, [state]);

  return (
    <>
      <form
        action={formAction}
        className="h-full w-full lg:max-w-[800px] flex flex-row items-center justify-center pr-4"
      >
        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white p-2 rounded"
        >
          <PlusIcon size={20} />
        </button>
      </form>

      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[320px]">
            <h3 className="text-xl font-semibold mb-3">Error</h3>
            <p className="text-gray-600">Failed to create note. Please try again.</p>
            <button
              onClick={() => setShowError(false)}
              className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
