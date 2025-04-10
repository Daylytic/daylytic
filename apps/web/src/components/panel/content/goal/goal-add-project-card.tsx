import { Button, Card, Input, Spin } from "antd";
import { styles, useAddProjectCard } from ".";
import clsx from "clsx";
import { PlusCircleOutlined } from "@ant-design/icons";

interface GoalAddProjectCardProps {
  alwaysShowInput?: boolean;
  setup?: {
    onChange: (projectName: string) => void;
  };
}

export const GoalAddProjectCard = ({ alwaysShowInput = false, setup }: GoalAddProjectCardProps) => {
  const {
    isValidLength,
    showInput,
    loading,
    handleCreateProject,
    projectName,
    handleInputChange,
    handleHideInput,
    handleShowInput,
  } = useAddProjectCard({ alwaysShowInput, setup });

  return (
    <>
      {showInput || alwaysShowInput ? (
        <Card
          className={clsx(
            styles["project-card-creator"],
            setup && styles["project-card-creator-setup"],
          )}
          actions={
            setup
              ? undefined
              : [
                  loading ? (
                    <Spin size="small" />
                  ) : (
                    <PlusCircleOutlined onClick={handleCreateProject} />
                  ),
                ]
          }
        >
          <Input.TextArea
            size="small"
            className={clsx(styles["create-project-input"], "ant-typography h3")}
            placeholder="Create A New Project"
            aria-selected={true}
            status={projectName.length > 0 && !isValidLength(projectName) ? "error" : undefined}
            onChange={handleInputChange}
            onBlur={handleHideInput}
            aria-multiline={false}
            autoFocus={true}
            variant="borderless"
            autoSize
            value={projectName}
            onPressEnter={handleCreateProject}
            aria-label="New task input"
            disabled={loading}
          />
        </Card>
      ) : (
        <Button
          onClick={handleShowInput}
          color="default"
          variant="filled"
          size="large"
          className={styles["project-card-button-creator"]}
        >
          Create A New Project
        </Button>
      )}
    </>
  );
};
