import { List } from "antd";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import { styles } from ".";
import { TaskListSkeleton } from "./skeleton";
import { Task } from "types/task";
import { ReactNode } from "react";

interface TaskListProps {
  fetched: boolean;
  orderable: boolean;
  tasks: Task[];
  updateTask: (task: Task) => void;
  renderItem: (item: Task, index: number) => ReactNode;
}

export const TaskList = ({ fetched, orderable, tasks, updateTask, renderItem }: TaskListProps) => {
  if (!fetched) {
    return <TaskListSkeleton />;
  }

  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = sortedTasks.findIndex((task) => task.id === active.id);
    const newIndex = sortedTasks.findIndex((task) => task.id === over?.id);

    const updatedTasks = arrayMove(sortedTasks, oldIndex, newIndex);

    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      position: index,
    }));

    reorderedTasks.forEach((task) => {
      updateTask(task);
    });
  };

  const list = (
    <List
      itemLayout="vertical"
      dataSource={sortedTasks}
      className={styles["tasks-list"]}
      renderItem={renderItem}
    />
  );

  if (!orderable) {
    return list;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedTasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {list}
      </SortableContext>
    </DndContext>
  );
};
