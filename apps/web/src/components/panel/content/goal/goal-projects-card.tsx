import { Button, Card, Dropdown, Flex, Input, MenuProps, Popconfirm, Spin } from "antd";
import { styles } from ".";
import {
  BorderLeftOutlined,
  BorderRightOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Project } from "types/goal";
import { GoalTaskCard } from "components/panel/content/goal/goal-task-card";
import clsx from "clsx";
import DropIndicator from "components/drop-indicator/drop-indicator";
import { useProjectsCard } from "components/panel/content/goal/use-projects-card";
import React, { useRef, useState } from "react";
import { useProject } from "providers/project";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";

interface GoalProjectsCardProps {
  project: Project;
}

export const GoalProjectsCard = ({ project }: GoalProjectsCardProps) => {
  const {
    loading,
    isDraggedOver,
    handleInputChange,
    handleTaskCreate,
    sortedTasks,
    closestEdge,
    projectRef,
    cardListRef,
    headerRef,
    taskName,
  } = useProjectsCard(project);
  const { updateProjects, projects, deleteProject } = useProject();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const titleRef = useRef(project.title);

  const moveProject = async (startIndex: number, finishIndex: number) => {
    const reorderedProjects = reorder({
      list: projects,
      startIndex,
      finishIndex,
    });

    await updateProjects(reorderedProjects);
  };

  const deleteCurrentProject = async () => {
    deleteProject(project.goalId, project.id);
  };

  const items: MenuProps["items"] = [
    {
      label: "Move To The Left",
      key: "1",
      icon: <BorderLeftOutlined />,
      onClick: async () => {
        console.log("1");
        const startIndex = projects.map((proj) => proj.id).indexOf(project.id);
        if (startIndex !== -1) {
          console.log("2");
          await moveProject(startIndex, startIndex - 1);
        }
      },
    },
    {
      label: "Move To The Right",
      key: "2",
      icon: <BorderRightOutlined />,
      onClick: async () => {
        const startIndex = projects.map((proj) => proj.id).indexOf(project.id);
        if (startIndex !== -1) {
          await moveProject(startIndex, startIndex + 1);
        }
      },
    },
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this project?"
          onConfirm={deleteCurrentProject}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      ),
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: async () => {},
    },
  ];

  return (
    <li className={styles["project-card-wrapper"]} ref={cardListRef}>
      <Card
        ref={projectRef}
        data-project-id={project.id}
        className={clsx(
          styles["project-card"],
          isDraggedOver && styles["project-card-dragged-over"],
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
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="text">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </Flex>
        <ul className={styles["project-card-tasks"]}>
          {sortedTasks.map((task) => (
            <GoalTaskCard key={task.id} item={task} goalId={project.goalId} tags={[]} />
          ))}
        </ul>
      </Card>
      {closestEdge && <DropIndicator edge={closestEdge} />}
    </li>
  );
};
