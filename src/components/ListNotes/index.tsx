"use client";
import style from "./style.module.css";

import DeleteNoteButton from "@/components/DeleteNoteButton";
import { EditIcon } from "lucide-react";
import Link from "next/link";

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
  const reversedNotes = (notes && notes.toReversed()) || [];
  return (
    <div className="grid grid-cols-1 p-4 gap-2 lg:max-w-[800px] lg:grid-cols-2 justify-center align-center items-center">
      {(reversedNotes.length > 0 &&
        reversedNotes.map((note) => (
          <div
            className="bg-[#c9ada7] p-4 pr-0 overflow-hidden w-[300px] min-h-[100px] max-h-[200px] border-[#9a8c98] text-[#22223b] rounded border-2"
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
            <Link href={`/notes/${note.id}`}>
              <div
                className={`${style.scrollbar} p-2 overscroll-contain  h-full w-full overflow-y-auto overflow-x-hidden`}
              >
                <div className="text-xl font-bold">
                  {note.content.split("\n")[1]}
                </div>
              </div>
            </Link>
          </div>
        ))) || <div> </div>}
    </div>
  );
}
