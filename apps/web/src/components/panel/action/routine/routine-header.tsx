import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Typography, Popover, Descriptions, Button, DescriptionsProps } from "antd";
import clsx from "clsx";
import { useDailyTasks } from "providers/daily-tasks";
import styles from "./routine.module.css";

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Words",
    children: "234",
  },
  {
    key: "2",
    label: "Characters",
    children: "2437",
  },
  {
    key: "3",
    label: "Created",
    children: "08:22 28th January 2025",
  },
  {
    key: "4",
    label: "Updated",
    children: "11:32 28th January 2025",
  },
];

export const RoutineHeader = () => {
  const { selectedTask } = useDailyTasks();
  return (
    <Flex className={clsx("ant-typography")} justify="space-between" align="center">
      <Typography.Title
        level={2}
        // editable
        editable={{
          icon: <EditOutlined className={styles["header-edit-icon"]} />,
          triggerType: ["icon"], // Hide the edit icon; click text to edit
          autoSize: { maxRows: 1}, // Match text height
        }}
        style={{ marginBottom: "0" }}
      >
        {selectedTask!.title}
      </Typography.Title>
      <Popover
        placement="bottomLeft"
        content={
          <Descriptions column={1} layout="vertical" items={items} style={{ width: "auto" }} />
        }
        trigger={"click"}
      >
        <Button icon={<InfoCircleOutlined />} type={"text"} />
      </Popover>
    </Flex>
  );
};
