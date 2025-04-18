import {
  $createHorizontalRuleNode,
  $isHorizontalRuleNode,
  HorizontalRuleNode,
} from "@lexical/react/LexicalHorizontalRuleNode";
import { ElementTransformer } from "@lexical/markdown";
import { TRANSFORMERS as BUILTIN_TRANSFORMERS } from '@lexical/markdown';

export const HORIZONTAL_RULE_TRANSFORMER: ElementTransformer = {
  type: "element",
  dependencies: [HorizontalRuleNode],
  // Match lines like '---', '***', or '___'
  regExp: /^(?:-{3,}|\*{3,}|_{3,})\s*$/,
  replace: (parentNode, _children, _match, _isImport) => {
    parentNode.replace($createHorizontalRuleNode());
  },
  export: (node) => ($isHorizontalRuleNode(node) ? "---" : null),
};

export const ASSISTANCE_TRANSFORMERS = [HORIZONTAL_RULE_TRANSFORMER, ...BUILTIN_TRANSFORMERS];
