import React, { lazy, Suspense, useMemo, useRef, useState } from "react";
import { Spin } from "antd";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import clsx from "clsx";
import styles from "./lexical.module.css";
import { EditorType } from "~/components/common/editor";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LexicalContentEditable } from "~/components/common/editor/ui/content-editable";

// Lazy load plugins with prefetch hints
const LazyHistoryPlugin = lazy(() =>
  import("@lexical/react/LexicalHistoryPlugin").then((module) => ({
    default: module.HistoryPlugin,
  })),
);
const LazyRichTextPlugin = lazy(() =>
  import("@lexical/react/LexicalRichTextPlugin").then((module) => ({
    default: module.RichTextPlugin,
  })),
);
const LazyPlainTextPlugin = lazy(() =>
  import("@lexical/react/LexicalPlainTextPlugin").then((module) => ({
    default: module.PlainTextPlugin,
  })),
);
const LazyShortcutsPlugin = lazy(() =>
  import("~/components/common/editor/plugins/shortcuts").then((module) => ({
    default: module.ShortcutsPlugin,
  })),
);
const LazyToolbarPlugin = lazy(() =>
  import("~/components/common/editor/plugins/toolbar").then((module) => ({
    default: module.ToolbarPlugin,
  })),
);
const LazyCodeHighlightPlugin = lazy(() =>
  import("~/components/common/editor/plugins/code-highlight").then((module) => ({
    default: module.CodeHighlightPlugin,
  })),
);
const LazyListPlugin = lazy(() =>
  import("@lexical/react/LexicalListPlugin").then((module) => ({
    default: module.ListPlugin,
  })),
);
const LazyTabIndentationPlugin = lazy(() =>
  import("@lexical/react/LexicalTabIndentationPlugin").then(
    (module) => ({
      default: module.TabIndentationPlugin,
    }),
  ),
);
const LazyCheckListPlugin = lazy(() =>
  import("@lexical/react/LexicalCheckListPlugin").then((module) => ({
    default: module.CheckListPlugin,
  })),
);
const LazyMarkdownShortcutPlugin = lazy(() =>
  import("@lexical/react/LexicalMarkdownShortcutPlugin").then((module) => ({
    default: module.MarkdownShortcutPlugin,
  })),
);
const LazyFloatingLinkEditorPlugin = lazy(() =>
  import("~/components/common/editor/plugins/floating-link-editor").then((module) => ({
    default: module.FloatingLinkEditorPlugin,
  })),
);
const LazyLinkPlugin = lazy(() =>
  import("~/components/common/editor/plugins/link").then((module) => ({
    default: module.LinkPlugin,
  })),
);
const LazyOnChangePlugin = lazy(() =>
  import("~/components/common/editor/plugins/on-change").then((module) => ({
    default: module.OnChangePlugin,
  })),
);

interface EditorProps {
  // eslint-disable-next-line
  onChange: (editor: any) => void;
  type: EditorType;
  showToolbar: boolean;
}

const Editor = ({ onChange, type, showToolbar }: EditorProps) => {
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
        <LazyHistoryPlugin />
        <LazyMarkdownShortcutPlugin />
        <LazyCodeHighlightPlugin />
        <LazyLinkPlugin />
        <LazyListPlugin />
        <LazyTabIndentationPlugin />
        <LazyCheckListPlugin />
        <LazyShortcutsPlugin editor={activeEditor.current} setIsLinkEditMode={setIsLinkEditMode} />
        {floatingAnchorElem.current && (
          <LazyFloatingLinkEditorPlugin
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
    <Suspense fallback={<Spin tip="Loading editor..." />}>
      {type === EditorType.rich ? (
        <>
          {showToolbar && (
            <LazyToolbarPlugin
              editor={editor}
              activeEditor={activeEditor.current}
              setActiveEditor={(value) => {
                activeEditor.current = value;
              }}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          )}
          <LazyRichTextPlugin
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
        <LazyPlainTextPlugin
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
      <LazyOnChangePlugin onChange={onChange} />
    </Suspense>
  );
};

export default Editor;
