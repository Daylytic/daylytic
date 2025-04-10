/* eslint-disable */
import { EditorType, Lexical } from "~/components/common/editor";
import { TaskEditorSkeleton } from ".";
import { Task } from "~/types/task";
import { $createParagraphNode, $getRoot } from "lexical";

interface TaskEditorProps {
  selectedTask: Task | undefined;
  onChange: (task: Task) => void;
}

export const TaskEditor = ({ selectedTask, onChange }: TaskEditorProps) => {
  return selectedTask ? (
    <Lexical
      key={selectedTask.id}
      type={EditorType.rich}
      defaultContent={selectedTask.content}
      id={selectedTask.id}
      showToolbar={true}
      editable={true}
      generateDefaultContent={() => {
        const initialParagraph = $createParagraphNode();
        const root = $getRoot();
        return root.append(initialParagraph);
      }}
      onChange={(editor: any) => {
        selectedTask.content = editor.toJSON();
        onChange(selectedTask!);
      }}
    />
  ) : (
    <TaskEditorSkeleton />
  );
};
