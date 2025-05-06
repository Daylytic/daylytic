import React, { useMemo, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import clsx from "clsx";
import styles from "./lexical.module.css";
import { EditorType } from "~/components/common/editor";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LexicalContentEditable } from "~/components/common/editor/ui/content-editable";

// Normal imports
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";

import { ShortcutsPlugin } from "~/components/common/editor/plugins/shortcuts";
import { ToolbarPlugin } from "~/components/common/editor/plugins/toolbar";
import { CodeHighlightPlugin } from "~/components/common/editor/plugins/code-highlight";
import { FloatingLinkEditorPlugin } from "~/components/common/editor/plugins/floating-link-editor";
import { LinkPlugin } from "~/components/common/editor/plugins/link";

interface EditorProps {
  // eslint-disable-next-line
  onChange: (editor: any) => void;
  type: EditorType;
  showToolbar: boolean;
}

const Editor = ({ type, showToolbar }: EditorProps) => {
  const [editor] = useLexicalComposerContext();
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const activeEditor = useRef(editor);
  const floatingAnchorElem = useRef<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      floatingAnchorElem.current = _floatingAnchorElem;
    }
  };

  // Group plugins together so they load concurrently under one Suspense boundary
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
        <HorizontalRulePlugin />
        <ShortcutsPlugin editor={activeEditor.current} setIsLinkEditMode={setIsLinkEditMode} />
        {floatingAnchorElem.current && (
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem.current}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        )}
      </>
    ),
    [isLinkEditMode],
  );

  return (
    <>
      {type === EditorType.rich ? (
        <>
          {showToolbar && (
            <ToolbarPlugin
              editor={editor}
              activeEditor={activeEditor.current}
              setActiveEditor={(value) => {
                activeEditor.current = value;
              }}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          )}
          <RichTextPlugin
            contentEditable={
              <div className={styles.scroller}>
                <div className={clsx(styles.editor, "css-var-rl", "ant-input-css-var")} ref={onRef}>
                  <LexicalContentEditable placeholder="Type here your note..." />
                </div>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          {Plugins}
        </>
      ) : (
        <PlainTextPlugin
          contentEditable={
            <div className={styles.scroller}>
              <div className={clsx(styles.editor, "css-var-rl", "ant-input-css-var")} ref={onRef}>
                <LexicalContentEditable placeholder="Type here your note..." />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      )}
      {/* <LazyOnChangePlugin onChange={onChange} /> */}
    </>
  );
};

export default Editor;
