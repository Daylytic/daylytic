import { Lexical } from "components/common/editor";
import { useDailyTasks } from "providers/daily-tasks";
import { RoutineEditorSkeleton } from ".";

export const RoutineEditor = () => {
  const { selectedTask, updateTask } = useDailyTasks();
  return selectedTask.current ? (
    <Lexical
      key={selectedTask.current.id}
      selectedTask={selectedTask.current}
      onChange={(editor) => {
        selectedTask!.current!.content = editor.toJSON();
        updateTask(selectedTask!.current!);
      }}
    />
  ) : (
    <RoutineEditorSkeleton />
  );
};
