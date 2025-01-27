import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
  TextFormatType,
} from "lexical";
import {
  FORMAT,
  IconKey,
  currentFormat$,
  iconComponentFor$,
  applyFormat$,
  useTranslation,
} from "@mdxeditor/editor";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface FormatButtonProps {
  format: number;
  addTitle: string;
  removeTitle: string;
  icon: IconKey;
  formatName: TextFormatType;
}

const FormatButton: React.FC<FormatButtonProps> = ({
  format,
  addTitle,
  removeTitle,
  icon,
  formatName,
}) => {
  const [currentFormat, iconComponentFor] = useCellValues(
    currentFormat$,
    iconComponentFor$
  );
  const applyFormat = usePublisher(applyFormat$);
  const active = (currentFormat & format) !== 0;

  return (
    <Tooltip title={active ? removeTitle : addTitle}>
      <Button
        variant={active ? "text" : undefined}
        icon={iconComponentFor(icon)}
        onClick={() => {
          applyFormat(formatName);
        }}
      />
    </Tooltip>
  );
};

export interface BoldItalicUnderlineTogglesProps {
  options?: ("Bold" | "Italic" | "Underline")[];
}

/**
 * A toolbar component that lets the user toggle bold, italic and underline formatting.
 * @group Toolbar Components
 */
export const BoldItalicUnderlineToggles: React.FC<
  BoldItalicUnderlineTogglesProps
> = ({ options }) => {
  const t = useTranslation();

  const showAllButtons = typeof options === "undefined";
  return (
    <div>
      {showAllButtons || options.includes("Bold") ? (
        <FormatButton
          format={IS_BOLD}
          addTitle={t("toolbar.bold", "Bold")}
          removeTitle={t("toolbar.removeBold", "Remove bold")}
          icon="format_bold"
          formatName="bold"
        />
      ) : null}
      {showAllButtons || options.includes("Italic") ? (
        <FormatButton
          format={IS_ITALIC}
          addTitle={t("toolbar.italic", "Italic")}
          removeTitle={t("toolbar.removeItalic", "Remove italic")}
          icon="format_italic"
          formatName="italic"
        />
      ) : null}
      {showAllButtons || options.includes("Underline") ? (
        <FormatButton
          format={IS_UNDERLINE}
          addTitle={t("toolbar.underline", "Underline")}
          removeTitle={t("toolbar.removeUnderline", "Remove underline")}
          icon="format_underlined"
          formatName="underline"
        />
      ) : null}
    </div>
  );
};

export interface StrikeThroughSupSubTogglesProps {
  options?: ("Strikethrough" | "Sub" | "Sup")[];
}

/**
 * A toolbar component that lets the user toggle strikeThrough, superscript and subscript formatting.
 * @group Toolbar Components
 */
export const StrikeThroughSupSubToggles: React.FC<
  StrikeThroughSupSubTogglesProps
> = ({ options }) => {
  const t = useTranslation();
  const showAllButtons = typeof options === "undefined";

  return (
    <div>
      {showAllButtons || options.includes("Strikethrough") ? (
        <FormatButton
          format={IS_STRIKETHROUGH}
          addTitle={t("toolbar.strikethrough", "Strikethrough")}
          removeTitle={t("toolbar.removeStrikethrough", "Remove strikethrough")}
          icon="strikeThrough"
          formatName="strikethrough"
        />
      ) : null}
      {showAllButtons || options.includes("Sup") ? (
        <FormatButton
          format={IS_SUPERSCRIPT}
          addTitle={t("toolbar.superscript", "Superscript")}
          removeTitle={t("toolbar.removeSuperscript", "Remove superscript")}
          icon="superscript"
          formatName="superscript"
        />
      ) : null}
      {showAllButtons || options.includes("Sub") ? (
        <FormatButton
          format={IS_SUBSCRIPT}
          addTitle={t("toolbar.subscript", "Subscript")}
          removeTitle={t("toolbar.removeSubscript", "Remove subscript")}
          icon="subscript"
          formatName="subscript"
        />
      ) : null}
    </div>
  );
};
