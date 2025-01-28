import {
  insertDirective$,
  iconComponentFor$,
  useTranslation,
  admonitionLabelsMap,
} from "@mdxeditor/editor";
import { useCellValue, usePublisher } from "@mdxeditor/gurx";
import { Button, Dropdown, Flex, Menu, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { useMemo } from "react";

export const ADMONITION_TYPES = [
  "note",
  "tip",
  "danger",
  "info",
  "caution",
] as const;

/**
 * A toolbar dropdown button that allows the user to insert admonitions.
 * For this to work, you need to have the `directives` plugin enabled with the {@link AdmonitionDirectiveDescriptor} configured.
 *
 * @group Toolbar Components
 */
export const InsertAdmonition = () => {
  const insertDirective = usePublisher(insertDirective$);
  const iconComponentFor = useCellValue(iconComponentFor$);
  const t = useTranslation();

  const menuItems: MenuProps["items"] = useMemo(() => {
    const labels = admonitionLabelsMap(t);
    return ADMONITION_TYPES.map((type) => ({
      key: type,
      label: labels[type],
      onClick: () =>
        insertDirective({
          type: "containerDirective",
          name: type,
        }),
    }));
  }, [t, insertDirective]);

  return (
    <Tooltip title={t("toolbar.admonition", "Insert Admonition")}>
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
          size="small"
          icon={
            <Flex justify="center" align="center" style={{ display: "flex" }}>
              {iconComponentFor("admonition")}
            </Flex>
          }
        />
      </Dropdown>
    </Tooltip>
  );
};
