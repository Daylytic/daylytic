import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import {
  sandpackConfig$,
  iconComponentFor$,
  insertSandpack$,
  useTranslation,
} from "@mdxeditor/editor";
import { MenuProps, Tooltip, Dropdown, Button, Flex } from "antd";
import { useMemo } from "react";

/**
 * A dropdown button that allows the user to insert a live code block into the editor. The dropdown offers a list of presets that are defined in the sandpack plugin config.
 * For this to work, you need to have the `sandpackPlugin` installed.
 * @group Toolbar Components
 */
export const InsertSandpack = () => {
  const [sandpackConfig, iconComponentFor] = useCellValues(
    sandpackConfig$,
    iconComponentFor$
  );
  const insertSandpack = usePublisher(insertSandpack$);
  const t = useTranslation();

  const menuItems: MenuProps["items"] = useMemo(
    () =>
      sandpackConfig.presets.map((preset) => ({
        key: preset.name,
        label: preset.label,
        onClick: () => insertSandpack(preset.name),
      })),
    [sandpackConfig, insertSandpack]
  );

  return (
    <Tooltip title={t("toolbar.insertSandpack", "Insert Sandpack")}>
      <Dropdown
        menu={{
          items: menuItems,
          style: { maxHeight: 300, overflowY: "auto" },
        }}
        trigger={["click"]}
        placement="bottom"
      >
        <Button
          type="text"
          icon={
            <Flex justify="center" align="center" style={{ display: "flex" }}>
              {iconComponentFor("sandpack")}
            </Flex>
          }
          aria-label={t("toolbar.insertSandpack", "Insert Sandpack")}
        />
      </Dropdown>
    </Tooltip>
  );
};
