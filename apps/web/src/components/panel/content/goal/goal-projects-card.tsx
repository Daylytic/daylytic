import { Card } from "antd";
import { styles } from ".";
import { TaskCard } from "components/common/task";

export const GoalProjectsCard = ({ contentLines }: { contentLines: number }) => {
  return (
    <Card title="Default Project" extra={<a href="#">More</a>} className={styles.card}>
      {[...Array(contentLines)].map((_, i) => (
        <TaskCard
          orderable={false}
          item={{
            id: i.toString(),
            position: 0,
            taskType: "TODOLIST",
            priority: null,
            title: `Task Card ${i}`,
            content: {},
            isCompleted: true,
            createdAt: "",
            updatedAt: "",
            deadline: null,
            userId: "",
            tagIds: [],
          }}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          onCheckboxChange={function (): Promise<void> {
            throw new Error("Function not implemented.");
          }}
          tags={[]}
        />
      ))}
    </Card>
  );
};
