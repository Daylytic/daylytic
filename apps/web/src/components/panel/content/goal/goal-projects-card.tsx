import { Button, Card, Dropdown, Flex, Input, Spin } from "antd";
import { styles, useProjectsCard } from ".";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Project } from "~/types/goal";
import clsx from "clsx";
import { DropIndicator } from "~/components/common/drop-indicator/drop-indicator";
import React from "react";
import { TextArea } from "~/components/common/text-area";
import { Task } from "~/types/task";
import { TaskList } from "~/components/common/task/task-list";
import { PROJECT_TITLE_MAX_LENGTH, PROJECT_TITLE_MIN_LENGTH } from "@daylytic/shared/constants";

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
    isValidLength,
    handleStartEditing,
    handleEndEditing,
    handleCancelEditing,
    editing,
    items,
    fetched,
    handleTaskClick,
    updateTasks,
    inputRef,
  } = useProjectsCard(project);

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
              ref={inputRef}
              size="middle"
              className={styles.input}
              prefix={<PlusOutlined />}
              placeholder="Create A New task"
              status={taskName.length > 0 && !isValidLength(taskName) ? "error" : undefined}
              autoFocus={false}
              value={taskName}
              onChange={handleInputChange}
              onPressEnter={handleTaskCreate}
              aria-label="Create A New Task"
              disabled={loading}
              suffix={loading && <Spin size="small" />}
            />
          </Flex>,
        ]}
      >
        <Flex justify="space-between" align="start" className={styles["project-card-header"]}>
          <TextArea
            type="h4"
            ref={headerRef}
            defaultValue={project.title ?? ""}
            minLength={PROJECT_TITLE_MIN_LENGTH}
            maxLength={PROJECT_TITLE_MAX_LENGTH}
            editing={editing}
            className={!editing && styles["project-card-title"]}
            onStart={handleStartEditing}
            onCancel={handleCancelEditing}
            onEnd={handleEndEditing}
          />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="text">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </Flex>
        <TaskList
          tasks={sortedTasks}
          fetched={fetched}
          handleTaskClick={handleTaskClick}
          handleTaskUpdate={async (task: Task): Promise<void> => {
            await updateTasks([task], true);
          }}
        />
      </Card>
      {closestEdge && <DropIndicator edge={closestEdge} divider={false} />}
    </li>
  );
};
