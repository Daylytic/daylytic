import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

export const OnChangePlugin = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      const isEditorEmpty = editorState.read(() => {
        const root = $getRoot();
        const isEmpty = !root.getFirstChild();

        return isEmpty;
      });

      if (isEditorEmpty) {
        return;
      }

      onChange(editorState);
    });
    return () => {
      unregister();
    };
  }, [editor, onChange]);

  return null;
};
