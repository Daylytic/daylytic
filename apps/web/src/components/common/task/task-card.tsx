import { Checkbox, Button, Flex, CheckboxChangeEvent } from "antd";
import { Tag as TagModel, Task } from "~/types/task";
import { styles } from ".";
import { Tag } from "~/components/common/tag";
import clsx from "clsx";
import { useParams } from "react-router";
import { useSelectedTask } from "~/providers/selected-task";
import { useTaskCard } from "~/components/common/task/use-task-card";
import { DropIndicator } from "~/components/common/drop-indicator/drop-indicator";
import { DeleteOutlined } from "@ant-design/icons";
import { Tag as AntTag } from "antd";
import { timeFormat } from "~/utils/date";
import dayjs from "dayjs";
import React from "react";

interface TaskCardProps {
  item: Task;
  tags: TagModel[];
  dnd?: boolean;
  onTaskClick: (task: Task) => void;
  onCheckboxChange: ((e: CheckboxChangeEvent) => void) | undefined;
  showDelete?: boolean;
  onDelete?: (task: Task) => void;
}

export const TaskCard = React.memo(
  ({ item, tags, onCheckboxChange, onTaskClick, dnd, showDelete, onDelete }: TaskCardProps) => {
    const { selectedTask } = useSelectedTask();
    const { taskId } = useParams();
    const dndData = useTaskCard({
      item,
      selectedTask,
      enabled: dnd,
    });

    const isSelected = selectedTask?.id === item.id;
    const ref = dnd !== false ? dndData.ref! : undefined;
    const dragging = dnd !== false ? dndData.dragging! : undefined;
    const closestEdge = dnd !== false ? dndData.closestEdge! : undefined;
    
    return (
      <li
        ref={ref}
        data-task-id={item.id}
        className={clsx(styles["task-card"], dragging && styles["task-card-dragged"])}
      >
        <Button
          type="text"
          variant={isSelected && taskId ? "filled" : undefined}
          color="primary"
          onClick={() => onTaskClick(item)}
          className={styles["task-card-button"]}
        >
          <Flex
            align="start"
            gap="small"
            flex={1}
            className={styles["task-card-button-details-wrapper"]}
          >
            <Checkbox
              defaultChecked={item.isCompleted}
              onChange={onCheckboxChange}
              onClick={(e) => e.stopPropagation()}
            />
            <Flex vertical className={styles["task-card-button-details"]}>
              <span className={styles["task-card-button-title"]}>
                {item.title} {item.deadline && <AntTag key={item.id}>{dayjs(item.deadline).format(timeFormat).toString()}</AntTag>}
              </span>
              <Flex wrap gap="small">
                {item.tagIds.map((tagId) => {
                  const tag = tags.find((tag) => tag.id === tagId);
                  if (!tag) return null;
                  return <Tag key={tagId} tag={tag} />;
                })}
              </Flex>
            </Flex>
          </Flex>
          {showDelete && (
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(item);
              }}
              className={styles["task-card-delete-button"]}
            />
          )}
        </Button>
        {closestEdge && <DropIndicator edge={closestEdge} divider={true} />}
      </li>
    );
  },
);
