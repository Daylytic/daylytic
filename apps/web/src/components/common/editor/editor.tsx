import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { ShortcutsPlugin } from "components/common/editor/plugins/shortcuts";
import { ToolbarPlugin } from "components/common/editor/plugins/toolbar";
import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CodeHighlightPlugin } from "components/common/editor/plugins/code-highlight";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalContentEditable } from "components/common/editor/ui/content-editable";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { FloatingLinkEditorPlugin } from "components/common/editor/plugins/floating-link-editor";
import { LinkPlugin } from "components/common/editor/plugins/link";
import { OnChangePlugin } from "components/common/editor/plugins/on-change";

import styles from "./lexical.module.css";
import clsx from "clsx";

export const Editor = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();
  const editorState = editor.getEditorState();
  const json = editorState.toJSON();

  console.log(json);

  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <>
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
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
      <HistoryPlugin />
      <MarkdownShortcutPlugin />
      <CodeHighlightPlugin />
      <ShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
      <LinkPlugin />
      <ListPlugin />
      <CheckListPlugin />

      {floatingAnchorElem && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        </>
      )}

      <OnChangePlugin onChange={onChange} />
    </>
  );
};
