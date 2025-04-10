import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Popover, Descriptions, Button, Tooltip } from "antd";
import { TaskHeaderSkeleton, styles, useHeader } from ".";
import { TextArea } from "~/components/common/text-area";
import { TASK_TITLE_MAX_LENGTH, TASK_TITLE_MIN_LENGTH } from "@daylytic/shared/constants";
import { Task } from "~/types/task";

interface TaskHeaderProps {
  selectedTask: Task | undefined;
  onChange: (task: Task) => void;
}

export const TaskHeader = ({ selectedTask, onChange }: TaskHeaderProps) => {
  if (selectedTask === undefined) {
    return <TaskHeaderSkeleton />;
  }

  const { menuItems, handleOpenDetails, handleClose } = useHeader({ selectedTask });

  return (
    <Flex className="ant-typography" justify="space-between" align="start">
      <TextArea
        type="h2"
        minLength={TASK_TITLE_MIN_LENGTH}
        maxLength={TASK_TITLE_MAX_LENGTH}
        defaultValue={selectedTask.title}
        className={styles["header-title"]}
        editableTrigger="textarea"
        onChange={async (text) => {
          selectedTask.title = text;
          onChange(selectedTask);
        }}
      />
      <Tooltip title="Info">
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
          trigger="click"
        >
          <Button onClick={handleOpenDetails} icon={<InfoCircleOutlined />} type="text" />
        </Popover>
      </Tooltip>
      <Tooltip title="Close">
        <Button onClick={handleClose} icon={<CloseOutlined />} type="text" />
      </Tooltip>
    </Flex>
  );
};
