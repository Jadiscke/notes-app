"use client";

import MDEditor from "@uiw/react-md-editor";
export default function Note({ content }: { content: string }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4" data-color-mode="light">
      <MDEditor.Markdown
        className="!bg-[#c9ada7] p-4 border-[#9a8c98] lg:w-1/2 !text-[#22223b] rounded border-2"
        source={content}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}
