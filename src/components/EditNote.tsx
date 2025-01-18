"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
export default function Note({ content }: { content: string }) {
  const [value, setValue] = useState(content);

  return (
    <div className="flex flex-col lg:flex-row gap-4" data-color-mode="light">
      <MDEditor
        className="!bg-[#c9ada7] p-4 border-[#9a8c98] lg:w-1/2 !text-[#22223b] rounded border-2"
        height={"fit-content"}
        data-color-mode="light"
        preview="edit"
        value={value}
        onChange={setValue}
      />

      <MDEditor.Markdown
        className="!bg-[#c9ada7] p-4 border-[#9a8c98] lg:w-1/2 !text-[#22223b] rounded border-2"
        source={value}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}
