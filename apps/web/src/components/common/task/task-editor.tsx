import { Lexical } from "components/common/editor";
import { TaskEditorSkeleton } from ".";
import { Task } from "types/task";

interface TaskEditorProps {
  selectedTask: Task | undefined;
  onChange: (task: Task) => void;
}

export const TaskEditor = ({ selectedTask, onChange }: TaskEditorProps) => {
  return selectedTask ? (
    <Lexical
      key={selectedTask.id}
      selectedTask={selectedTask}
      onChange={(editor: any, task: Task) => {
        task.content = editor.toJSON();
        onChange(task!);
      }}
    />
  ) : (
    <TaskEditorSkeleton />
  );
};
