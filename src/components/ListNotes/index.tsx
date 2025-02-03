"use client";

import DeleteNoteButton from "@/components/DeleteNoteButton";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import EditNote from "../EditNote";

interface ListNotesProps {
  notes: {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: string;
  }[];
}
export default function ListNotes({ notes }: ListNotesProps) {
  return (
    <div className="grid grid-cols-1 p-4 gap-2 w-full lg:max-w-[600px]  justify-center align-center items-center">
      {(notes.length > 0 &&
        notes.map((note) => (
          <div
            className="bg-[#c9ada7] p-4 pr-0 overflow-hidden w-full h-fit  border-[#9a8c98] text-[#22223b] rounded border-2"
            key={note.id}
          >
            <div className="flex flex-row justify-between">
              <div>
                {note.created_at.slice(0, 10) +
                  " " +
                  note.created_at.slice(11, 16)}
              </div>
              <div className="flex flex-row gap-2 justify-end pr-4">
                <DeleteNoteButton note_id={note.id} />
                <Link href={`/notes/${note.id}/edit`}>
                  <EditIcon size={20} />
                </Link>
              </div>
            </div>
            <EditNote noteId={note.id} content={note.content} hidden={true} />
          </div>
        ))) || <div> </div>}
    </div>
  );
}
