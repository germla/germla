import { TypistEditor, RichTextKit } from "@doist/typist";
import { useRef } from "react";

export const Editor = ({ content }: { content?: string }) => {
  const contentRef = useRef(content || "");
  return (
    <TypistEditor
      placeholder="A full rich-text editor, be creative…"
      content={contentRef.current}
      extensions={[RichTextKit]}
    />
  );
};
