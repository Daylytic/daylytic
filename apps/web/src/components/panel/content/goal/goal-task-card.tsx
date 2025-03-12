import { List, Checkbox, Button, Flex, Typography } from "antd";
import { Tag as TagModel, Task } from "types/task";
import { styles } from ".";
import { Tag } from "components/common/tag";
import { useRef, useEffect, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import clsx from "clsx";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"; // NEW
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"; // NEW
import DropIndicator from "components/drop-indicator/drop-indicator";

interface GoalTaskCardProps {
  item: Task;
  onClick: () => void;
  onCheckboxChange: () => Promise<void>;
  tags: TagModel[];
  style?: React.CSSProperties;
}

export const GoalTaskCard = ({ item, onClick, onCheckboxChange, tags }: GoalTaskCardProps) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false); // NEW
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null); // NEW

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return combine(
      draggable({
        element: el,
        onDragStart: () => setDragging(true), // NEW
        onDrop: () => {
          setDragging(false);
          setClosestEdge(null);
        },
        getInitialData: () => ({ type: "task-card", taskId: item.id, index: item.position }),
      }),
      dropTargetForElements({
        element: el,
        canDrop: ({ source }) => source.data.taskId !== item.id && source.data.type ==="task-card",
        getData: ({ input, element }) => {
          // To attach card data to a drop target
          const data = { type: "task-card", taskId: item.id, index: item.position };

          // Attaches the closest edge (top or bottom) to the data object
          // This data will be used to determine where to drop card relative
          // to the target card.
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky: () => true, // To make a drop target "sticky"
        onDragEnter: ({ source, self }) => {
          if(source.data === undefined) return;

            const closestEdge = extractClosestEdge(self.data);

            const sourceIndex = source.data.index;
            console.log([sourceIndex, item.position]);
            if(typeof sourceIndex !== 'number') return;  
            // invariant(typeof sourceIndex === 'number');

            const isItemBeforeSource = item.position === sourceIndex - 1;
            const isItemAfterSource = item.position === sourceIndex + 1;

            const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === 'bottom') ||
            (isItemAfterSource && closestEdge === 'top');

            if (isDropIndicatorHidden) {
            setClosestEdge(null);
            return;
            }

            setClosestEdge(closestEdge);
        },
        onDrag: ({ source, self }) => {
          if (source.data.taskId !== item.id) {
            setClosestEdge(extractClosestEdge(self.data));
          }

          if(source.data === undefined) return;

          const closestEdge = extractClosestEdge(self.data);

          const sourceIndex = source.data.index;
          // invariant(typeof sourceIndex === 'number');
          if(typeof sourceIndex !== 'number') return;  

          const isItemBeforeSource = item.position === sourceIndex - 1;
          const isItemAfterSource = item.position === sourceIndex + 1;

          const isDropIndicatorHidden =
          (isItemBeforeSource && closestEdge === 'bottom') ||
          (isItemAfterSource && closestEdge === 'top');

          if (isDropIndicatorHidden) {
          setClosestEdge(null);
          return;
          }

          setClosestEdge(closestEdge);
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      }),
    );
  }, [item.id]);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <List.Item className={clsx(styles["task-card"], dragging && styles["task-card-dragged"])}>
        <Button type="text" onClick={onClick} className={styles["task-card-button"]}>
          <Flex flex={1} gap={12} wrap className={styles["task-card-button-details"]}>
            <Flex gap="small">
              <Checkbox
                className={styles.checkbox}
                checked={item.isCompleted}
                onChange={onCheckboxChange}
              />
              <Typography.Paragraph className={styles["task-card-button-title"]}>
                {item.title}
              </Typography.Paragraph>
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
        {closestEdge && <DropIndicator edge={closestEdge}/>}
      </List.Item>

    </div>
  );
};
