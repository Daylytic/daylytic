import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ToolbarContext } from "components/common/editor/context/toolbar";
import { Editor } from "components/common/editor";
import { TaskNodes } from "components/common/editor/nodes/nodes";
import { theme } from "./themes/daylytic-theme";
import styles from "./lexical.module.css";
import { Task } from "types/task";
import { $createParagraphNode, $getRoot } from "lexical";

const onError = (error) => {
  console.error(error);
};

interface LexicalProps {
  selectedTask: Task;
  onChange: (editor) => void;
}

export const Lexical = ({ selectedTask, onChange }: LexicalProps) => {
  // eslint-disable-next-line
  const content = JSON.stringify(selectedTask!.content) as any;
  const initialConfig = {
    namespace: "daylytic",
    theme: theme,
    onError,
    nodes: [...TaskNodes],

    editorState:
      content === "{}"
        ? () => {
            // Ensure valid initial state
            const initialParagraph = $createParagraphNode();
            const root = $getRoot();
            root.append(initialParagraph);
          }
        : content,
  };

  return (
    <div className={styles.wrapper}>
      <LexicalComposer
        key={selectedTask.id} // Or key={JSON.stringify(selectedTask.content)}
        initialConfig={initialConfig}
      >
        <ToolbarContext>
          <Editor onChange={onChange} />
        </ToolbarContext>
      </LexicalComposer>
    </div>
  );
};
