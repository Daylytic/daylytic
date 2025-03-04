import { Flex, Typography } from "antd";
import { styles } from ".";
import { useParams } from "react-router";
import { useGoal } from "providers/goal";
const { Title } = Typography;

export const GoalHeader = () => {
  const { goalId } = useParams();
  const { goals } = useGoal();

  const selectedGoal = goals.find((goal) => goal.id === goalId);
  
  return (
    <Flex vertical>
      <Title level={1}>{selectedGoal?.title}</Title>
      <Typography.Paragraph className={styles["header-description"]}>
        {selectedGoal?.description}
      </Typography.Paragraph>
    </Flex>
  );
};
