import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_DESCRIPTION_MIN_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";
import { Button, Flex, Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import styles from "./routine.module.css";
import { useDailyTasks } from "providers/daily-tasks";
import { InfoCircleOutlined } from "@ant-design/icons";
import Editor from "components/common/editor/editor";

export const RoutineInputs = () => {
  const { updateTask, selectedTask, setSelectedTask } = useDailyTasks();

  return (
    <Flex vertical>
      <Flex justify="space-between" align="center">
        <Typography.Title level={2}>{selectedTask!.title}</Typography.Title>
        {<InfoCircleOutlined />}
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
