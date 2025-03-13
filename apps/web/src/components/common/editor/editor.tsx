import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { ShortcutsPlugin } from "components/common/editor/plugins/shortcuts";
import { ToolbarPlugin } from "components/common/editor/plugins/toolbar";
import { useMemo, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CodeHighlightPlugin } from "components/common/editor/plugins/code-highlight";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalContentEditable } from "components/common/editor/ui/content-editable";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { FloatingLinkEditorPlugin } from "components/common/editor/plugins/floating-link-editor";
import { LinkPlugin } from "components/common/editor/plugins/link";
import { OnChangePlugin } from "components/common/editor/plugins/on-change";

import styles from "./lexical.module.css";
import clsx from "clsx";
import { Task } from "types/task";

interface EditorProps {
  selectedTask: Task;
  onChange: (editor, task: Task) => void;
}

const Editor = ({ onChange, selectedTask }: EditorProps) => {
  const [editor] = useLexicalComposerContext();

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const activeEditor = useRef(editor);
  const floatingAnchorElem = useRef<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      floatingAnchorElem.current = _floatingAnchorElem;
    }
  };

  const Plugins = useMemo(
    () => (
      <>
        <HistoryPlugin />
        <MarkdownShortcutPlugin />
        <CodeHighlightPlugin />
        <LinkPlugin />
        <ListPlugin />
        <TabIndentationPlugin />
        <CheckListPlugin />
      </>
    ),
    [],
  );

  return (
    <>
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor.current}
        setActiveEditor={(value) => {
          activeEditor.current = value;
        }}
        setIsLinkEditMode={setIsLinkEditMode}
      />
      <RichTextPlugin
        contentEditable={
          <div className={styles.scroller}>
            <div className={clsx(styles.editor, "css-var-rl", "ant-input-css-var")} ref={onRef}>
              <LexicalContentEditable placeholder={"Type here your note..."} />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />

      <ShortcutsPlugin editor={activeEditor.current} setIsLinkEditMode={setIsLinkEditMode} />
      {Plugins}

      {floatingAnchorElem.current && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem.current}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        </>
      )}

      <OnChangePlugin selectedTask={selectedTask} onChange={onChange} />
    </>
  );
};

export default Editor;
