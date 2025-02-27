import { Card } from "antd";
import { styles } from ".";
import { TaskCard, TaskList } from "components/common/task";
import { Task } from "types/task";
import { ReactNode } from "react";

export const GoalProjectsCard = ({ contentLines }: { contentLines: number }) => {
  const tasks = [...Array(contentLines)].map((_, i) => ({
    id: i.toString(),
    position: 0,
    taskType: "TODOLIST",
    priority: null,
    title: `Task Cardd ${i}`,
    content: {},
    isCompleted: true,
    createdAt: "",
    updatedAt: "",
    deadline: null,
    userId: "",
    tagIds: [],
  })) as Task[];

  return (
    <Card title="Default Project" extra={<a href="#">More</a>} className={styles.card}>
      <TaskList
        orderable={true}
        fetched={true}
        tasks={tasks}
        updateTask={(_) => {}}
        renderItem={(item: Task): ReactNode => {
          return (
            <TaskCard
              orderable={false}
              item={item}
              onClick={function (): void {
                throw new Error("Function not implemented.");
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
