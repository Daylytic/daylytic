import { useCellValue, usePublisher } from "@mdxeditor/gurx";
import { Button, Flex, Tooltip } from "antd";
import { LinkOutlined, UndoOutlined } from "@ant-design/icons";
import {
  iconComponentFor$,
  IS_APPLE,
  openLinkEditDialog$,
  useTranslation,
} from "@mdxeditor/editor";

/**
 * A toolbar component that opens the link edit dialog.
 * For this component to work, you must include the `linkDialogPlugin`.
 * @group Toolbar Components
 */
export const CreateLink = () => {
  const openLinkDialog = usePublisher(openLinkEditDialog$);
  const iconComponentFor = useCellValue(iconComponentFor$);
  const t = useTranslation();
  return (
    <Tooltip title={t("toolbar.link", "Create link")}>
      <Button
        type={"text"}
        icon={<Flex justify="center" align="center" style={{display: "flex"}}>
        <LinkOutlined />
      </Flex>}
        onClick={() => {
          openLinkDialog();
        }}
      >
      </Button>
    </Tooltip>
  );
};
