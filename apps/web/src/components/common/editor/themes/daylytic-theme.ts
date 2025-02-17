import type {EditorThemeClasses} from 'lexical';

import styles from './daylytic-theme.module.css';
import clsx from 'clsx';

export const theme: EditorThemeClasses = {
  autocomplete: styles.autocomplete,
  blockCursor: styles.blockCursor,
  characterLimit: styles.characterLimit,
  code: clsx(styles.code, "ant-typography"),
  codeHighlight: {
    atrule: styles.tokenAttr,
    attr: styles.tokenAttr,
    boolean: styles.tokenProperty,
    builtin: styles.tokenSelector,
    cdata: styles.tokenComment,
    char: styles.tokenSelector,
    class: styles.tokenFunction,
    'class-name': styles.tokenFunction,
    comment: styles.tokenComment,
    constant: styles.tokenProperty,
    deleted: styles.tokenProperty,
    doctype: styles.tokenComment,
    entity: styles.tokenOperator,
    function: styles.tokenFunction,
    important: styles.tokenVariable,
    inserted: styles.tokenSelector,
    keyword: styles.tokenAttr,
    namespace: styles.tokenVariable,
    number: styles.tokenProperty,
    operator: styles.tokenOperator,
    prolog: styles.tokenComment,
    property: styles.tokenProperty,
    punctuation: styles.tokenPunctuation,
    regex: styles.tokenVariable,
    selector: styles.tokenSelector,
    string: styles.tokenSelector,
    symbol: styles.tokenProperty,
    tag: styles.tokenProperty,
    url: styles.tokenOperator,
    variable: styles.tokenVariable,
  },
  embedBlock: {
    base: styles.embedBlock,
    focus: styles.embedBlockFocus,
  },
  hashtag: styles.hashtag,
  heading: {
    h1: "ant-typography",
    h2: "ant-typography",
    h3: "ant-typography",
    h4: "ant-typography",
    h5: "ant-typography",
    h6: "ant-typography",
  },
  hr: styles.hr,
  image: styles["editor-image"],
  indent: styles.indent,
  inlineImage: styles["inline-editor-image"],
  layoutContainer: styles.layoutContainer,
  layoutItem: styles.layoutItem,
  link: styles.link,
  list: {
    checklist: styles.checklist,
    listitem: clsx(styles.listItem, "ant-checkbox-wrapper css-var-Rdalfmcjcma ant-checkbox-css-var"),
    listitemChecked: clsx(styles.listItemChecked), //styles.listItemChecked,
    listitemUnchecked: clsx(styles.listItemUnchecked, "ant-checkbox-inner"), // styles.listItemUnchecked
    nested: {
      listitem: styles.nestedListItem,
    },
    olDepth: [
      styles.ol1,
      styles.ol2,
      styles.ol3,
      styles.ol4,
      styles.ol5,
    ],
    ul: styles.ul,
  },
  ltr: styles.ltr,
  mark: styles.mark,
  markOverlap: styles.markOverlap,
  paragraph: "ant-typography",
  quote: styles.quote,
  rtl: styles.rtl,
  specialText: styles.specialText,
  tab: styles.tabNode,
  table: styles.table,
  tableAlignment: {
    center: styles.tableAlignmentCenter,
    right: styles.tableAlignmentRight,
  },
  tableCell: styles.tableCell,
  tableCellActionButton: styles.tableCellActionButton,
  tableCellActionButtonContainer: styles.tableCellActionButtonContainer,
  tableCellHeader: styles.tableCellHeader,
  tableCellResizer: styles.tableCellResizer,
  tableCellSelected: styles.tableCellSelected,
  tableRowStriping: styles.tableRowStriping,
  tableScrollableWrapper: styles.tableScrollableWrapper,
  tableSelected: styles.tableSelected,
  tableSelection: styles.tableSelection,
  text: {
    bold: styles.textBold,
    capitalize: styles.textCapitalize,
    code: styles.textCode,
    italic: styles.textItalic,
    lowercase: styles.textLowercase,
    strikethrough: styles.textStrikethrough,
    subscript: styles.textSubscript,
    superscript: styles.textSuperscript,
    underline: styles.textUnderline,
    underlineStrikethrough: styles.textUnderlineStrikethrough,
    uppercase: styles.textUppercase,
  },
};