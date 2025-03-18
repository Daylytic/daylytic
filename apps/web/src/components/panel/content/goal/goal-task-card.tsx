import { Checkbox, Button, Flex, CheckboxChangeEvent } from "antd";
import { Tag as TagModel, Task } from "types/task";
import { styles } from ".";
import { Tag } from "components/common/tag";
import clsx from "clsx";
import DropIndicator from "components/drop-indicator/drop-indicator";
import { useTaskCard } from "components/panel/content/goal/use-task-card";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { getGoalRoute } from "utils/routes";
import { useSelectedTask } from "providers/selected-task";
import { useTask } from "providers/task";

interface GoalTaskCardProps {
  item: Task;
  goalId: string;
  tags: TagModel[];
  style?: React.CSSProperties;
}

export const GoalTaskCard = React.memo(
  ({ item, goalId, tags }: GoalTaskCardProps) => {
    const { selectedTask, setSelectedTask } = useSelectedTask();
    const { updateTasks } = useTask();
    const { taskId } = useParams();
    const { ref, closestEdge, dragging } = useTaskCard({
      item,
      selectedTask: selectedTask,
    });
    const navigate = useNavigate();

    const handleTaskClick = useCallback(
      (task: Task) => {
        if (selectedTask?.id === task.id) {
          navigate(getGoalRoute(goalId));
          setSelectedTask(undefined);

          return;
        }
        setSelectedTask(task);
        navigate(getGoalRoute(goalId, task.id));
      },
      [navigate, selectedTask],
    );

    const onCheckboxChange = async (e: CheckboxChangeEvent) => {
      item.isCompleted = e.target.checked;
      await updateTasks({ [goalId]: [item] }, true);
    };

    return (
      <li
        ref={ref}
        data-task-id={item.id}
        className={clsx(styles["task-card"], dragging && styles["task-card-dragged"])}
      >
        <Button
          type="text"
          variant={selectedTask?.id === item.id && taskId ? "filled" : undefined}
          color="primary"
          onClick={() => handleTaskClick(item)}
          className={clsx(
            styles["task-card-button"],
            selectedTask?.id === item.id && "task-card-button-selected",
          )}
        >
          <Flex flex={1} gap={12} wrap className={styles["task-card-button-details"]}>
            <Flex gap="small" align="start">
              <Checkbox
                className={styles.checkbox}
                defaultChecked={item.isCompleted}
                onChange={onCheckboxChange}
                onClick={(e) => e.stopPropagation()} // Prevents click event from reaching Button
              />
              <span className={styles["task-card-button-title"]}>{item.title}</span>
            </Flex>
            <Flex wrap gap="small">
              {item.tagIds.map((tagId) => {
                const tag = tags.find((tag) => tag.id === tagId);
                if (!tag) return null;
                return <Tag key={tagId} tag={tag} />;
              })}
            </Flex>
          </Flex>
        </Button>
        {closestEdge && <DropIndicator edge={closestEdge} />}
      </li>
    );
  },
);
