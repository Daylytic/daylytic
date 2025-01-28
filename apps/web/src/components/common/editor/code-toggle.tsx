import React from "react";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import { currentFormat$, iconComponentFor$, applyFormat$, useTranslation, IS_CODE } from "@mdxeditor/editor";
import { Tooltip, Button, Flex } from "antd";

/**
 * A toolbar component that lets the user toggle code formatting.
 * Use for inline `code` elements (like variables, methods, etc).
 * @group Toolbar Components
 */
export const CodeToggle: React.FC = () => {
  const [currentFormat, iconComponentFor] = useCellValues(
    currentFormat$,
    iconComponentFor$
  );
  const applyFormat = usePublisher(applyFormat$);
  const t = useTranslation();

  const codeIsOn = (currentFormat & IS_CODE) !== 0;

  const title = codeIsOn
    ? t("toolbar.removeInlineCode", "Remove code format")
    : t("toolbar.inlineCode", "Inline code format");

  return (
    <Tooltip title={title}>
      <Button
        type={"text"}
        icon={
          <Flex justify="center" align="center" style={{ display: "flex" }}>
            {iconComponentFor('code')}
          </Flex>
        }
        onClick={() => {
          applyFormat.bind(null, "code");
        }}
      />
    </Tooltip>
  );
};
