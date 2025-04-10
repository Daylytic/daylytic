import { Flex, CheckboxChangeEvent, Divider } from "antd";
import { styles, TaskCard, TaskListSkeleton } from ".";
import { Task } from "~/types/task";
import { useTags } from "~/providers/tag";

interface TaskListProps {
  tasks: Task[];
  fetched: boolean;
  dnd?: boolean;
  handleTaskClick: (task: Task) => void;
  handleTaskUpdate: (task: Task) => Promise<void>;
  showDelete?: boolean;
  onDelete?: (task: Task) => void;
}

export const TaskList = ({
  tasks,
  dnd,
  fetched,
  handleTaskClick,
  handleTaskUpdate,
  showDelete,
  onDelete,
}: TaskListProps) => {
  const { tags } = useTags();

  if (tasks.length < 1 && fetched) {
    return <></>;
  }

  return (
    <ul className={styles["tasks-list"]} data-tour-id="task-list">
      {fetched ? (
        tasks.map((task) => {
          return (
            <Flex key={task.id} gap="small" vertical>
              <TaskCard
                item={task}
                tags={tags}
                dnd={dnd}
                onDelete={onDelete}
                showDelete={showDelete}
                onTaskClick={handleTaskClick}
                onCheckboxChange={async (e: CheckboxChangeEvent) => {
                  task.isCompleted = e.target.checked;
                  await handleTaskUpdate(task);
                }}
              />

              {tasks.indexOf(task) !== tasks.length - 1 ? <Divider style={{ margin: 0 }} /> : <></>}
            </Flex>
          );
        })
      ) : (
        <TaskListSkeleton />
      )}
    </ul>
  );
};
