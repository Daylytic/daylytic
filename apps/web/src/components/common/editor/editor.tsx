import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import "./editor.css";
import ShortcutsPlugin from "components/common/editor/plugins/shortcuts";
import ToolbarPlugin from "components/common/editor/plugins/toolbar";
import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CodeHighlightPlugin } from "components/common/editor/plugins/code-highlight";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import ContentEditable from "components/common/editor/ui/content-editable/content-editable";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import FloatingLinkEditorPlugin from "components/common/editor/plugins/floating-link-editor";
import LinkPlugin from "components/common/editor/plugins/link";

export const Editor = () => {
  const [editor] = useLexicalComposerContext();
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
          <div className="editor-scroller">
            <div className="editor css-var-rl ant-input-css-var" ref={onRef}>
              <ContentEditable placeholder={"Type here your note..."} />
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

      {/* Lists */}
      <ListPlugin />
      <CheckListPlugin />

      {floatingAnchorElem && (
        <>
          {/* <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
          <CodeActionMenuPlugin anchorElem={floatingAnchorElem} /> */}
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
          {/* <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
          <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
          <FloatingTextFormatToolbarPlugin
            anchorElem={floatingAnchorElem}
            setIsLinkEditMode={setIsLinkEditMode}
          /> */}
        </>
      )}
    </>
  );
};
