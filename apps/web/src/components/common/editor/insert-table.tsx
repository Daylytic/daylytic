import { usePublisher } from "@mdxeditor/gurx";
import { TableOutlined } from "@ant-design/icons";
import {
  insertTable$,
  useTranslation,
} from "@mdxeditor/editor";
import { Tooltip, Button, Flex } from "antd";

/**
 * A toolbar button that allows the user to insert a table.
 * For this button to work, you need to have the `tablePlugin` plugin enabled.
 * @group Toolbar Components
 */
export const InsertTable: React.FC = () => {
  const insertTable = usePublisher(insertTable$);
  const t = useTranslation();

  return (
    <Tooltip title={t("toolbar.table", "Insert Table")}>
      <Button
        type={"text"}
        icon={<Flex justify="center" align="center" style={{display: "flex"}}>
        <TableOutlined />
      </Flex>}
        onClick={() => {
          insertTable({ rows: 3, columns: 3 });
        }}
      ></Button>
    </Tooltip>
  );
};
