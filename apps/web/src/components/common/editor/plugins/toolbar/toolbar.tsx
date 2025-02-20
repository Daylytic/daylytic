import type { JSX } from "react";

import { $isCodeNode, CODE_LANGUAGE_MAP } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { $isTableSelection } from "@lexical/table";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  NodeKey,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { Dispatch, useCallback, useEffect, useState } from "react";
import * as React from "react";
import { blockTypeToBlockName, useToolbarState } from "components/common/editor/context/toolbar";
import {
  formatParagraph,
  formatHeading,
  formatBulletList,
  formatNumberedList,
  formatCheckList,
  formatQuote,
  formatCode,
} from "components/common/editor/plugins/toolbar/utils";
import { Button, Divider, Tooltip, Space, Select, Flex } from "antd";
import {
  AlignLeftOutlined,
  BoldOutlined,
  CheckSquareOutlined,
  CodeOutlined,
  HddOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { IS_APPLE } from "utils/environment";

import { GrBlockQuote } from "react-icons/gr";
import { getSelectedNode } from "utils/get-selected-note";
import { SHORTCUTS } from "components/common/editor/plugins/shortcuts/shortcuts-list";

import styles from "./toolbar.module.css";
import { sanitizeUrl } from "utils/url";

// eslint-disable-next-line
const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};

const BlockFormatDropDown = ({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element => {
  // Handler that calls the proper formatting function based on the selected value
  const handleChange = (value) => {
    switch (value) {
      case "paragraph":
        formatParagraph(editor);
        break;
      case "h1":
        formatHeading(editor, blockType, "h1");
        break;
      case "h2":
        formatHeading(editor, blockType, "h2");
        break;
      case "h3":
        formatHeading(editor, blockType, "h3");
        break;
      case "h4":
        formatHeading(editor, blockType, "h4");
        break;
      case "h5":
        formatHeading(editor, blockType, "h5");
        break;
      case "h6":
        formatHeading(editor, blockType, "h6");
        break;
      case "bullet":
        formatBulletList(editor, blockType);
        break;
      case "number":
        formatNumberedList(editor, blockType);
        break;
      case "check":
        formatCheckList(editor, blockType);
        break;
      case "quote":
        formatQuote(editor, blockType);
        break;
      case "code":
        formatCode(editor, blockType);
        break;
      default:
        break;
    }
  };

  // Build options for the Select component
  const options = [
    {
      value: "paragraph",
      label: (
        <Space>
          <AlignLeftOutlined />
          <span>Normal</span>
          <span className="shortcut">{SHORTCUTS.NORMAL}</span>
        </Space>
      ),
    },
    {
      value: "h1",
      label: (
        <Space>
          <HddOutlined />
          <span>Heading 1</span>
          <span className="shortcut">{SHORTCUTS.HEADING1}</span>
        </Space>
      ),
    },
    {
      value: "h2",
      label: (
        <Space>
          <HddOutlined />
          <span>Heading 2</span>
          <span className="shortcut">{SHORTCUTS.HEADING2}</span>
        </Space>
      ),
    },
    {
      value: "h3",
      label: (
        <Space>
          <HddOutlined />
          <span>Heading 3</span>
          <span className="shortcut">{SHORTCUTS.HEADING3}</span>
        </Space>
      ),
    },
    {
      value: "h4",
      label: (
        <Space>
          <HddOutlined />
          <span>Heading 4</span>
          <span className="shortcut">{SHORTCUTS.HEADING4}</span>
        </Space>
      ),
    },
    {
      value: "h5",
      label: (
        <Space>
          <HddOutlined />
          <span>Heading 5</span>
          <span className="shortcut">{SHORTCUTS.HEADING5}</span>
        </Space>
      ),
    },
    {
      value: "h6",
      label: (
        <Space>
          <HddOutlined />
          <span>Heading 6</span>
          <span className="shortcut">{SHORTCUTS.HEADING6}</span>
        </Space>
      ),
    },
    {
      value: "bullet",
      label: (
        <Space>
          <UnorderedListOutlined />
          <span>Bullet List</span>
          <span className="shortcut">{SHORTCUTS.BULLET_LIST}</span>
        </Space>
      ),
    },
    {
      value: "number",
      label: (
        <Space>
          <OrderedListOutlined />
          <span>Numbered List</span>
          <span className="shortcut">{SHORTCUTS.NUMBERED_LIST}</span>
        </Space>
      ),
    },
    {
      value: "check",
      label: (
        <Space>
          <CheckSquareOutlined />
          <span>Check List</span>
          <span className="shortcut">{SHORTCUTS.CHECK_LIST}</span>
        </Space>
      ),
    },
    {
      value: "quote",
      label: (
        <Space>
          <GrBlockQuote />
          <span>Quote</span>
          <span className="shortcut">{SHORTCUTS.QUOTE}</span>
        </Space>
      ),
    },
    {
      value: "code",
      label: (
        <Space>
          <CodeOutlined />
          <span>Code Block</span>
          <span className="shortcut">{SHORTCUTS.CODE_BLOCK}</span>
        </Space>
      ),
    },
  ];

  return (
    <Select
      style={{ width: 200 }}
      value={blockType}
      options={options}
      onChange={handleChange}
      disabled={disabled}
      variant="borderless"
    />
  );
};

const AntDivider = () => <Divider type="vertical" style={{ margin: "0 8px" }} />;

export const ToolbarPlugin = ({
  editor,
  activeEditor,
  setActiveEditor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element => {
  //   const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [_, setSelectedElementKey] = useState<NodeKey | null>(null);
  //   const [modal, showModal] = useModal();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const { toolbarState, updateToolbarState } = useToolbarState();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState("isLink", isLink);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();

          updateToolbarState("blockType", type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            updateToolbarState("blockType", type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            updateToolbarState(
              "codeLanguage",
              language ? CODE_LANGUAGE_MAP[language] || language : "",
            );
            return;
          }
        }
      }
    }
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      // Update text format
      updateToolbarState("isBold", selection.hasFormat("bold"));
      updateToolbarState("isItalic", selection.hasFormat("italic"));
      updateToolbarState("isUnderline", selection.hasFormat("underline"));
      updateToolbarState("isStrikethrough", selection.hasFormat("strikethrough"));
      updateToolbarState("isCode", selection.hasFormat("code"));
    }
  }, [activeEditor, editor, updateToolbarState]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar, setActiveEditor]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState("canUndo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState("canRedo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

  return (
    <Flex id={styles.wrapper}>
      <Tooltip title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}>
        <Button
          disabled={!toolbarState.canUndo || !isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          icon={<UndoOutlined />}
          type="text"
          className="toolbar-item spaced"
          aria-label="Undo"
        />
      </Tooltip>
      <Tooltip title={IS_APPLE ? "Redo (⇧⌘Z)" : "Redo (Ctrl+Y)"}>
        <Button
          disabled={!toolbarState.canRedo || !isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          icon={<RedoOutlined />}
          type="text"
          className="toolbar-item"
          aria-label="Redo"
        />
      </Tooltip>
      <AntDivider />
      {toolbarState.blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <BlockFormatDropDown
            disabled={!isEditable}
            blockType={toolbarState.blockType}
            editor={activeEditor}
          />
          <AntDivider />
        </>
      )}
      <Tooltip title={`Bold (${SHORTCUTS.BOLD})`}>
        <Button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          icon={<BoldOutlined />}
          type="text"
          className={"toolbar-item spaced " + (toolbarState.isBold ? "active" : "")}
          aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
        />
      </Tooltip>{" "}
      <Tooltip title={`Italic (${SHORTCUTS.ITALIC})`}>
        <Button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          icon={<ItalicOutlined />}
          type="text"
          className={"toolbar-item spaced " + (toolbarState.isItalic ? "active" : "")}
          aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
        />
      </Tooltip>
      <Tooltip title={`Underline (${SHORTCUTS.UNDERLINE})`}>
        <Button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          icon={<StrikethroughOutlined />}
          type="text"
          className={"toolbar-item spaced " + (toolbarState.isUnderline ? "active" : "")}
          aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
        />
      </Tooltip>
      <Tooltip title={`Insert link (${SHORTCUTS.INSERT_LINK})`}>
        <Button
          disabled={!isEditable}
          onClick={insertLink}
          icon={<LinkOutlined />}
          type="text"
          className={"toolbar-item spaced " + (toolbarState.isLink ? "active" : "")}
          aria-label="Insert link"
        />
      </Tooltip>
    </Flex>
  );
};
