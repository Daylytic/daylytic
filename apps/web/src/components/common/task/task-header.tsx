import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Typography, Popover, Descriptions, Button } from "antd";
import clsx from "clsx";
import { TaskHeaderSkeleton, styles, useHeader } from ".";
import { Task } from "types/task";

interface TaskHeaderProps {
  selectedTask: Task | undefined;
  onChange: (task: Task) => void;
}

export const TaskHeader = ({selectedTask, onChange}: TaskHeaderProps) => {

  if (selectedTask === undefined) {
    return <TaskHeaderSkeleton />;
  }

  const { menuItems, handleOpenDetails } = useHeader({ selectedTask });

  return (
    <Flex className={clsx("ant-typography")} justify="space-between" align="center">
      <Typography.Title
        level={2}
        editable={{
          onChange: (text) => {
            selectedTask.title = text;
            onChange(selectedTask);
          },
          icon: <EditOutlined className={styles["header-edit-icon"]} />,
          triggerType: ["icon"],
        }}
        className={styles["header-title"]}
      >
        {selectedTask.title}
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
