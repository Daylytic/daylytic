import { TASK_DESCRIPTION_MAX_LENGTH, TASK_DESCRIPTION_MIN_LENGTH, TASK_TITLE_MAX_LENGTH, TASK_TITLE_MIN_LENGTH } from "@daylytic/shared/constants";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDailyTasks } from "providers/daily-tasks";
import styles from "./routine.module.css";

export const RoutineInputs = () => {
  const { selectedTask, setSelectedTask } = useDailyTasks();

  return (
    <>
      <Input
        maxLength={TASK_TITLE_MAX_LENGTH}
        minLength={TASK_TITLE_MIN_LENGTH}
        placeholder="Enter title"
        showCount
        value={selectedTask!.title}
        onChange={(e) => {
          selectedTask!.title = e.target.value;
          setSelectedTask(selectedTask);
        }}
      />
      <TextArea
        showCount
        maxLength={TASK_DESCRIPTION_MAX_LENGTH}
        minLength={TASK_DESCRIPTION_MIN_LENGTH}
        placeholder="Enter description"
        id={styles["task-description"]}
        value={selectedTask!.description}
        onChange={(e) => {
          selectedTask!.description = e.target.value;
          setSelectedTask(selectedTask);
        }}
      />
    </>
  );
};
