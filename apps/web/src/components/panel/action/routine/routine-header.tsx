import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Typography, Popover, Descriptions, Button, Skeleton } from "antd";
import clsx from "clsx";
import { useDailyTasks } from "providers/daily-tasks";
import { RoutineHeaderSkeleton, styles, useHeader } from ".";

export const RoutineHeader = () => {
  const { selectedTask, updateTask } = useDailyTasks();

  if (selectedTask!.current === undefined) {
    return <RoutineHeaderSkeleton />;
  }

  const { menuItems, handleOpenDetails } = useHeader({ selectedTask });

  return (
    <Flex className={clsx("ant-typography")} justify="space-between" align="center">
      <Typography.Title
        level={2}
        editable={{
          onChange: (text) => {
            selectedTask!.current!.title = text;
            updateTask(selectedTask!.current!);
          },
          icon: <EditOutlined className={styles["header-edit-icon"]} />,
          triggerType: ["icon"],
          autoSize: { maxRows: 1 },
        }}
        className={styles["header-title"]}
      >
        {selectedTask!.current!.title}
      </Typography.Title>
      <Popover
        placement="bottomLeft"
        content={
          <Descriptions
            column={1}
            layout="vertical"
            items={menuItems}
            className={styles["menu-popover-description"]}
          />
        }
        trigger={"click"}
      >
        <Button onClick={handleOpenDetails} icon={<InfoCircleOutlined />} type={"text"} />
      </Popover>
    </Flex>
  );
};
