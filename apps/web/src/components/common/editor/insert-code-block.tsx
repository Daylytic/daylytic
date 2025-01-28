import React from "react";
import { useCellValue, usePublisher } from "@mdxeditor/gurx";
import { insertCodeBlock$, iconComponentFor$, useTranslation } from "@mdxeditor/editor";
import { Tooltip, Button, Flex } from "antd";

/**
 * A toolbar button that allows the user to insert a fenced code block.
 * Once the code block is focused, you can construct a special code block toolbar for it, using the {@link ConditionalContents} primitive.
 * See the {@link ConditionalContents} documentation for an example.
 *
 * @group Toolbar Components
 */
export const InsertCodeBlock: React.FC = () => {
  const insertCodeBlock = usePublisher(insertCodeBlock$)
  const iconComponentFor = useCellValue(iconComponentFor$)
  const t = useTranslation()
  
  return (
    <Tooltip title={t("toolbar.codeBlock", "Insert Code Block")}>
      <Button
        type={"text"}
        icon={
          <Flex justify="center" align="center" style={{ display: "flex" }}>
            {iconComponentFor('frame_source')}
          </Flex>
        }
        onClick={() => {
          insertCodeBlock({});
        }}
      />
    </Tooltip>
  );
};
