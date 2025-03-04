import { Card, Input, Spin } from "antd";
import { styles } from ".";
import { TaskCard, TaskList } from "components/common/task";
import { Task } from "types/task";
import { ReactNode, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Project } from "types/goal";
import { useGoal } from "providers/goal";
import { useNavigate } from "react-router";
import { getGoalRoute } from "utils/routes";

interface GoalProjectsCard {
  project: Project;
}

export const GoalProjectsCard = ({ project }: GoalProjectsCard) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const { createTask, getSelectedGoal, selectedTask, tasks } = useGoal();

  const handleInputChange = async (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskCreate = async () => {
    setLoading(true);
    await createTask(project.goalId, project.id, taskName);
    setTaskName("");
    setLoading(false);
  };

  return (
    <Card
      actions={[
        <Input
          size="large"
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
        />,
      ]}
      className={styles.card}
    >
      <Title level={3}>{project.title}</Title>
      <TaskList
        orderable={true}
        fetched={true}
        tasks={tasks.filter((task) => task.projectId === project.id)}
        updateTask={(_) => {}}
        renderItem={(item: Task): ReactNode => {
          return (
            <TaskCard
              orderable={false}
              item={item}
              onClick={() => {
                selectedTask.current = item;
                navigate(getGoalRoute(getSelectedGoal()!.id, item.id))
              }}
              onCheckboxChange={function (): Promise<void> {
                throw new Error("Function not implemented.");
              }}
              tags={[]}
            />
          );
        }}
      />
    </Card>
  );
};
