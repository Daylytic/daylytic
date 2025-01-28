import { LineOutlined } from "@ant-design/icons";
import { insertThematicBreak$, iconComponentFor$, useTranslation } from "@mdxeditor/editor";
import { useCellValue, usePublisher } from "@mdxeditor/gurx";
import { Tooltip, Button, Flex } from "antd";

/**
 * A toolbar button that allows the user to insert a thematic break (rendered as an HR HTML element).
 * For this button to work, you need to have the `thematicBreakPlugin` plugin enabled.
 * @group Toolbar Components
 */
export const InsertThematicBreak: React.FC = () => {
  const insertThematicBreak = usePublisher(insertThematicBreak$);
  const t = useTranslation();
  return (
    <Tooltip title={t("toolbar.thematicBreak", "Insert thematic break")}>
      <Button
        type={"text"}
        icon={<Flex justify="center" align="center" style={{display: "flex"}}>
        <LineOutlined />
      </Flex>}
        onClick={() => {
          insertThematicBreak();
        }}
      ></Button>
    </Tooltip>
  );
};
