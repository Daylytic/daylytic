import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ToolbarContext } from "~/components/common/editor/context/toolbar";
import Editor from "~/components/common/editor/editor";
import { TaskNodes } from "~/components/common/editor/nodes/nodes";
import { theme } from "./themes/daylytic-theme";
import styles from "./lexical.module.css";
import { $getRoot, EditorState, RootNode } from "lexical";

const onError = (error) => {
  console.error(error);
};

export enum EditorType {
  plain,
  rich,
}

interface LexicalProps {
  id: string;
  type: EditorType;
  editable: boolean;
  showToolbar: boolean;
  generateDefaultContent: (root: RootNode) => RootNode;
  // eslint-disable-next-line
  defaultContent: any;
  onChange: (editor: EditorState) => void;
}

export const Lexical = ({
  id,
  defaultContent,
  onChange,
  editable,
  showToolbar,
  type,
  generateDefaultContent,
}: LexicalProps) => {
  // eslint-disable-next-line
  const content = JSON.stringify(defaultContent) as any;
  const initialConfig = {
    namespace: "daylytic",
    theme: theme,
    onError,
    nodes: [
      ...TaskNodes,
    ],
    editable: editable,
    editorState:
      content === "{}"
        ? () => {
            const root = $getRoot();
            generateDefaultContent(root);
          }
        : content,
  };

  return (
    <div className={styles.wrapper}>
      <LexicalComposer key={id} initialConfig={initialConfig}>
        <ToolbarContext>
          <Editor showToolbar={showToolbar} onChange={onChange} type={type} />
        </ToolbarContext>
      </LexicalComposer>
    </div>
  );
};
