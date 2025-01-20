import { goals } from "@daylytic/shared/constants";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDailyTasks } from "providers/daily-tasks";

export const RoutineInputs = () => {
  const { selectedTask, setSelectedTask } = useDailyTasks();

  return (
    <>
      <Input
        maxLength={goals.MAX_GOAL_TITLE_LENGTH}
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
        maxLength={goals.MAX_GOAL_DESCRIPTION_LENGTH}
        placeholder="Enter description"
        style={{ height: "90px", resize: "none", marginBottom: "30px" }}
        value={selectedTask!.description}
        onChange={(e) => {
          selectedTask!.description = e.target.value;
          setSelectedTask(selectedTask);
        }}
      />
    </>
  );
};
