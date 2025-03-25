import React, { lazy, Suspense, useMemo, useRef, useState } from "react";
import { Spin } from "antd";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import clsx from "clsx";
import styles from "./lexical.module.css";
import { EditorType } from "~/components/common/editor";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LexicalContentEditable } from "~/components/common/editor/ui/content-editable";


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
