import { Button, Descriptions, Flex, Popover, Typography } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { InfoCircleOutlined } from "@ant-design/icons";
import Editor from "components/common/editor/editor";
import clsx from "clsx";

import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Words',
    children: '234',
  },
  {
    key: '2',
    label: 'Characters',
    children: '2437',
  },
  {
    key: '3',
    label: 'Created',
    children: '08:22 28th January 2025',
  },
  {
    key: '4',
    label: 'Updated',
    children: '11:32 28th January 2025',
  },
];

export const RoutineInputs = () => {
  const { updateTask, selectedTask, setSelectedTask } = useDailyTasks();

  return (
    <Flex vertical>
      <Flex
        className={clsx("ant-typography")}
        justify="space-between"
        align="center"
      >
        <Typography.Title level={2} style={{ marginBottom: "0" }}>
          {selectedTask!.title}
        </Typography.Title>
        <Popover
          placement="bottomLeft"
          content={<Descriptions column={1} layout="vertical" items={items} style={{width: "auto"}} />}
          trigger={"click"}
        >
          <Button icon={<InfoCircleOutlined />} type={"text"} />
        </Popover>
      </Flex>
      <Editor />
      {/* <TextArea
        variant="borderless"
        // maxLength={TASK_DESCRIPTION_MAX_LENGTH}
        minLength={TASK_DESCRIPTION_MIN_LENGTH}
        placeholder="Enter description"
        id={styles["task-description"]}
        style={{height: "20vh"}}
        value={selectedTask?.description || ""}
        onChange={(e) => {
          if (selectedTask) {
            const newTask = {
              ...selectedTask,
              description: e.target.value,
            };

            setSelectedTask(newTask);
            updateTask(newTask);
          }
        }}
      /> */}
    </Flex>
  );
};
