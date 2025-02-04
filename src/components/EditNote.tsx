"use client";

import { useState, useCallback} from "react";
import MDEditor from "@uiw/react-md-editor";

import { debounce } from "@/lib/utils";
import { saveNoteToDb } from "@/app/actions/save_note";

type NoteState = "writing..." | "saving..." | "saved" | `error: ${string}`;

function ErrorModal({ error, onClose }: { error: string; onClose: () => void }) {
  if (!error) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md min-w-[300px]">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Error</h3>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function EditNote({
  content,
  noteId,
  hidden = false,
}: {
  content: string;
  noteId: string;
  hidden?: boolean;
}) {
  const [value, setValue] = useState(content);
  const [noteState, setNoteState] = useState<NoteState>("saved");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounceUpdate = useCallback(
    debounce(
      async (noteId: string, newContent: string) => {
        try {
          setNoteState("saving...");
          const { success, error } = await saveNoteToDb(noteId, newContent);
          if (!success) {
            throw new Error(error!);
          }

          setNoteState("saved");
        } catch (err) {
          console.error(err);
          setNoteState("error:  An unknown error occurred");
        }
      },
      1500,
    ),
    [],
  );

  const handleChange = (newValue?: string) => {
    if (!newValue) return;
    setValue(newValue);

    if (noteState !== "writing...") {
      setNoteState("writing...");
    }
    handleDebounceUpdate(noteId, newValue);
  };

  const handleLineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    // Ensure the clicked element is a list item
    if (target.tagName === "LI" || target.closest("li")) {
      // get the line index from the data-item-id attribute
      const lineIndex = parseInt(target.attributes.getNamedItem("data-item-id")?.value || "0") - 1;
      const lines = value.split("\n");


     if (lineIndex === -1) return;

      const line = lines[lineIndex];

      // Toggle checkbox state
      if (line.includes("[x]") || line.includes("[ ]")) {
        setNoteState("writing...");
        const isChecked = line.includes("[x]");
        const updatedLine = isChecked
          ? line.replace("[x]", "[ ]") // Uncheck
          : line.replace("[ ]", "[x]"); // Check

        // Update the Markdown content
        lines[lineIndex] = updatedLine;
        const updatedContent = lines.join("\n");

        setValue(updatedContent);
        handleDebounceUpdate(noteId, updatedContent);
      }
    }
  };

  const Markdown = useCallback(() => {
    return (
      <MDEditor.Markdown
        className={`!bg-[#c9ada7] ${
          hidden
            ? ""
            : "p-4 border-[#9a8c98] w-full  !text-[#22223b] rounded border-2"
        }`}
        source={value}
        style={{ whiteSpace: "pre-wrap" }}
        components={{
          li: ({ children, ...props }) => {
            return <li {...props} data-item-id={props.node?.position?.start.line}>{children}</li>;
          },
        }}
      />
    );
  }, [value, hidden]);

  return (
    <>
      <div
        className={`flex flex-col ${
          hidden ? "" : "lg:grid lg:grid-cols-2"
        }  gap-4`}
        data-color-mode="light"
      >
        <div
          className={`${
            hidden ? "hidden" : ""
          } overflow-hidden w-full bg-[#c9ada7] p-4 border-[#9a8c98] !text-[#22223b] rounded border-2`}
        >
          <MDEditor
            className="!bg-[#c9ada7] w-full !text-[#22223b] rounded border-2"
            height={"fit-content"}
            data-color-mode="light"
            preview="edit"
            value={value}
            onChange={handleChange}
          />
          <span className="text-white inline-block w-full text-end text-sm">
            {noteState}
          </span>
        </div>

        <div onClick={handleLineClick}>
          <Markdown />
          {hidden && (
            <span className="text-white pr-2 pt-8 inline-block w-full text-end text-sm">
              {noteState}
            </span>
          )}
        </div>
      </div>
      <ErrorModal 
        error={noteState.startsWith("error:") ? noteState.slice(7) : ""} 
        onClose={() => setNoteState("saved")} 
      />
    </>
  );
}
