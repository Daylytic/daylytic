import { $createCodeNode } from "@lexical/code";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $isTableSelection } from "@lexical/table";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
} from "lexical";

export const formatParagraph = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, () => $createParagraphNode());
    }
  });
};

export const formatHeading = (
  editor: LexicalEditor,
  blockType: string,
  headingSize: HeadingTagType,
) => {
  if (blockType !== headingSize) {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(headingSize));
    });
  }
};

export const formatBulletList = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'bullet') {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatCheckList = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'check') {
    editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatNumberedList = (
  editor: LexicalEditor,
  blockType: string,
) => {
  if (blockType !== 'number') {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatQuote = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'quote') {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  }
};

export const formatCode = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'code') {
    editor.update(() => {
      let selection = $getSelection();

      if (selection !== null) {
        if (selection.isCollapsed()) {
          $setBlocksType(selection, () => $createCodeNode());
        } else {
          const textContent = selection.getTextContent();
          const codeNode = $createCodeNode();
          selection.insertNodes([codeNode]);
          selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertRawText(textContent);
          }
        }
      }
    });
  }
};

export const clearFormatting = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      const anchor = selection.anchor;
      const focus = selection.focus;
      const nodes = selection.getNodes();
      const extractedNodes = selection.extract();

      if (anchor.key === focus.key && anchor.offset === focus.offset) {
        return;
      }

      nodes.forEach((node, idx) => {
        if ($isTextNode(node)) {
          let textNode = node;
          if (idx === 0 && anchor.offset !== 0) {
            textNode = textNode.splitText(anchor.offset)[1] || textNode;
          }
          if (idx === nodes.length - 1) {
            textNode = textNode.splitText(focus.offset)[0] || textNode;
          }
          const extractedTextNode = extractedNodes[0];
          if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
            textNode = extractedTextNode;
          }

          if (textNode.__style !== '') {
            textNode.setStyle('');
          }
          if (textNode.__format !== 0) {
            textNode.setFormat(0);
            $getNearestBlockElementAncestorOrThrow(textNode).setFormat('');
          }
          node = textNode;
        } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
          node.replace($createParagraphNode(), true);
        } else if ($isDecoratorBlockNode(node)) {
          node.setFormat('');
        }
      });
    }
  });
};