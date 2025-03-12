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
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const { createTask, getSelectedGoal, selectedTask, tasks } = useGoal();
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null); // NEW

  const handleInputChange = async (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskCreate = async () => {
    setLoading(true);
    await createTask(project.goalId, project.id, taskName);
    setTaskName("");
    setLoading(false);
  };

  const projectTasks = tasks
    .filter((task) => task.projectId === project.id)
    // Maintain the order of tasks as they appear in the tasks array
    .sort((a, b) => tasks.indexOf(a) - tasks.indexOf(b));

  /* Drop Target */

  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const projectEl = projectRef.current;
    const headerEl = headerRef.current;
    const cardListEl = cardListRef.current;

    invariant(projectEl);
    invariant(headerEl);
    invariant(cardListEl);

    console.log("THEY GOT SET");

    // Set up the drop target for the column element
    return combine(
      draggable({
        element: projectEl,
        dragHandle: headerEl,
        onDragStart: () => {
          setIsDraggedOver(true); 
        },
        onDrop: () => {
          setIsDraggedOver(false);  
        },
        getInitialData: () => ({ projectId: project.id, index: project.position, type: "project" }),
      }),
      dropTargetForElements({
        element: cardListEl,
        onDragStart: () => setIsDraggedOver(true),
        canDrop: (args) => args.source.data.type === "task-card",
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
        getData: () => ({ projectId: project.id }),
        getIsSticky: () => true,
      }),
      dropTargetForElements({
        element: projectEl,
        canDrop: (args) => args.source.data.type === "project",
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = {
            projectId: project.id,
            type: "project",
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"],
          });
        },
        onDragEnter: ({ source, self }) => {
          if (source.data === undefined) return;
          const closestEdge = extractClosestEdge(self.data);
          setClosestEdge(closestEdge);
        },
        onDrag: ({ source, self }) => {
          if (source.data === undefined) return;
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDragLeave: () => {

          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      }),
    );
  }, [projectRef, headerRef, cardListRef]);

  const sortedTasks = [...projectTasks].sort((a, b) => a.position - b.position);
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
        <div className={styles["project-card-content"]}>
          <Title ref={headerRef} level={3} className={styles["project-card-title"]}>
            {project.title}
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
