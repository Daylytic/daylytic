import { List } from "antd";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import { useDailyTasks } from "providers/daily-tasks";
import { RoutineCard, styles } from ".";
import { RoutineListSkeleton } from "components/panel/content/routine/skeleton";

export const RoutineList = () => {
  const { tasks, updateTask, fetched } = useDailyTasks();

  if (!fetched) {
    return <RoutineListSkeleton />;
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
        <List
          itemLayout="vertical"
          dataSource={sortedTasks}
          className={styles["tasks-list"]}
          renderItem={(item) => <RoutineCard key={item.id} item={item} />}
        />
      </SortableContext>
    </DndContext>
  );
};
