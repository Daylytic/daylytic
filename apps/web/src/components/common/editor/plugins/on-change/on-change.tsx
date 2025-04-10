import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";

interface OnChangePluginProps {
  onChange: (editor: EditorState) => void;
}

export const OnChangePlugin = ({ onChange }: OnChangePluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
    return () => {
      unregister();
    };
  }, [editor, onChange]);

  return null;
};
