import { Flex } from "antd";
import { lazy, Suspense } from "react";
import { styles, useAction } from ".";
import { TaskHeader, TaskSettings } from "~/components/common/task";

const TaskEditor = lazy(() =>
  import("~/components/common/task").then((module) => ({ default: module.TaskEditor })),
);

export const TaskAction = () => {
  const { selectedTask, handleUpdate, handleDelete } = useAction();

  return (
    <Flex
      key={selectedTask?.id}
      vertical
      id={styles.wrapper}
      gap={selectedTask === undefined ? "small" : 0}
    >
      <TaskHeader
        selectedTask={selectedTask}
        onChange={async (task) => {
          if (!selectedTask) return;
          await handleUpdate(task, true);
        }}
      />
      <TaskSettings
        selectedTask={selectedTask}
        onChange={async (task) => {
          await handleUpdate(task, true);
        }}
        onConfirmDeletetion={handleDelete}
      />
      {/* Wrap lazy-loaded component with Suspense */}
      <Suspense fallback={<div></div>}>
        <TaskEditor
          selectedTask={selectedTask}
          onChange={async (task) => {
            await handleUpdate(task, false);
          }}
        />
      </Suspense>
    </Flex>
  );
};
