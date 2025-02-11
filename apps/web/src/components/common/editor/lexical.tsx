import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ToolbarContext } from "components/common/editor/context/toolbar";
import { Editor } from "components/common/editor";
import { TaskNodes } from "components/common/editor/nodes/nodes";
import { theme } from "./themes/daylytic-theme";
import styles from "./lexical.module.css";

const onError = (error) => {
  console.error(error);
}

export const Lexical = () => {
  const initialConfig = {
    namespace: "daylytic",
    theme: theme,
    onError,
    nodes: [...TaskNodes],
  };

  return (
    <div className={styles.wrapper}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarContext>
          <Editor />
        </ToolbarContext>
      </LexicalComposer>
    </div>
  );
};
