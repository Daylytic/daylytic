import { Button, Card, Input, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { styles, useCreatorCard } from ".";
import clsx from "clsx";

interface GoalCreatorCardProps {
  alwaysShowInput?: boolean;
  setup?: {
    onChange: (title: string, description: string) => void;
  };
}

export const GoalCreatorCard = ({ alwaysShowInput = false, setup }: GoalCreatorCardProps) => {
  const {
    showInput,
    loading,
    handleCreateGoal,
    handleTitleChange,
    handleHideInput,
    goalTitle,
    handleDescriptionChange,
    goalDescription,
    handleGoalCreateButtonClick,
    isValidLengthTitle,
    isValidLengthDescription,
  } = useCreatorCard({ alwaysShowInput, setup });

  return (
    <>
      {showInput || alwaysShowInput ? (
        <Card
          className={styles.card}
          actions={
            setup
              ? undefined
              : [
                  loading ? (
                    <Spin size="small" />
                  ) : (
                    <PlusCircleOutlined onClick={handleCreateGoal} />
                  ),
                ]
          }
          data-tour-id="menu-goals-creator"
        >
          <Input.TextArea
            size="small"
            className={clsx(styles["create-goal-input-title"], "ant-typography h4")}
            placeholder="Goal Title"
            aria-selected={true}
            onChange={handleTitleChange}
            onBlur={handleHideInput}
            autoFocus={true}
            variant="borderless"
            aria-multiline="false"
            status={goalTitle.length > 0 && !isValidLengthTitle(goalTitle) ? "error" : undefined}
            autoSize
            value={goalTitle}
            onPressEnter={handleCreateGoal}
            aria-label="New task input"
            disabled={loading}
          />
          <Input.TextArea
            size="small"
            className={clsx(styles["create-goal-input-description"], "ant-typography")}
            placeholder="Goal description"
            aria-selected={true}
            onChange={handleDescriptionChange}
            onBlur={handleHideInput}
            status={
              goalDescription.length > 0 && !isValidLengthDescription(goalDescription)
                ? "error"
                : undefined
            }
            variant="borderless"
            autoSize
            value={goalDescription}
            onPressEnter={handleCreateGoal}
            aria-label="New task input"
            disabled={loading}
          />
        </Card>
      ) : (
        <Button
          onClick={handleGoalCreateButtonClick}
          color="default"
          variant="filled"
          size="large"
          className={styles["goal-creator"]}
          icon={<PlusCircleOutlined />}
          data-tour-id="menu-goals-creator"
        >
          Create A New Goal
        </Button>
      )}
    </>
  );
};
