import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Task } from "types/task";

interface OnChangePluginProps {
  selectedTask: Task;
  onChange: (editor, task: Task) => void;
}

export const OnChangePlugin = ({ onChange, selectedTask }: OnChangePluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState, selectedTask);
    });
    return () => {
      unregister();
    };
  }, [editor, onChange]);

  return null;
};
