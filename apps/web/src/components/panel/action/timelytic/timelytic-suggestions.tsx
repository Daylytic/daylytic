import { Flex, Typography } from "antd";
import { styles, useSuggestions } from ".";

export const TimelyticSuggestions = () => {
  const { renderTasks } = useSuggestions();

  return (
    <Flex vertical className={styles.suggestions}>
      <Typography.Title level={3}>Suggestions</Typography.Title>
      {renderTasks()}
    </Flex>
  );
};
