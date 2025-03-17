import { Card, Flex, Input, Spin } from "antd";
import { styles } from ".";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Project } from "types/goal";
import { useGoal } from "providers/goal";
import { useNavigate } from "react-router";
import { getGoalRoute } from "utils/routes";
import { GoalTaskCard } from "components/panel/content/goal/goal-task-card";
import invariant from "tiny-invariant";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"; // NEW
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"; // NEW
import DropIndicator from "components/drop-indicator/drop-indicator";

interface GoalProjectsCardProps {
  project: Project;
}

export const GoalProjectsCard = ({ project }: GoalProjectsCardProps) => {
  const { updateProjects, projects, deleteProject } = useProject();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const titleRef = useRef(project.title);
  return (
    <div
      style={{

        position: "relative",
      }}
      ref={cardListRef}
    >
      <Card
        ref={projectRef}
        className={clsx(
          styles["project-card"],
          isDraggedOver && styles["project-card-dragged-over"],
          draggedOver === project.id && styles["project-card-dragged-over"],
        )}
        actions={[
          <Flex className={styles["input-wrapper"]}>
            <Input
              size="middle"
              className={styles.input}
              prefix={<PlusOutlined />}
              placeholder="Add a new task"
              autoFocus={false}
              value={taskName}
              onChange={handleInputChange}
              onPressEnter={handleTaskCreate}
              aria-label="New task input"
              disabled={loading}
              suffix={loading && <Spin size="small" />}
            />
          </Flex>,
        ]}
      >
        <Flex justify="space-between" align="start" className={styles["project-card-header"]}>
          <Title
            ref={headerRef}
            level={3}
            editable={{
              onStart: () => {
                setEditing(true);
              },
              onChange: (text) => {
                setTitle(text);
                titleRef.current = text;
              },
              onEnd: async () => {
                // Use the ref’s current value which is updated synchronously
                if (titleRef.current !== project.title) {
                  project.title = titleRef.current;
                  setEditing(false);
                  await updateProjects([project]);
                }
              },
              text: project.title,
              editing: editing,
              icon: <EditOutlined className={styles["project-card-title-icon"]} />,
              triggerType: ["icon"],
              enterIcon: null,
            }}
            className={clsx(styles["project-card-title"], styles["project-card-editable"])}
          >
            {title}
          </Title>

          <Flex vertical>
            {sortedTasks.map((task) => (
              <GoalTaskCard
                key={task.id}
                item={task}
                onClick={() => {
                  selectedTask.current = task;
                  navigate(getGoalRoute(getSelectedGoal()!.id, task.id));
                }}
                onCheckboxChange={function (): Promise<void> {
                  throw new Error("Function not implemented.");
                }}
                tags={[]}
              />
            ))}
          </Flex>
        </div>
      </Card>
      {closestEdge && <DropIndicator edge={closestEdge} gap={"10px"} />}
    </div>
  );
};
