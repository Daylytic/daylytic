import { Button, Card, Input, Spin } from "antd";
import { styles } from ".";
import clsx from "clsx";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useGoal } from "providers/goal";
import { useProject } from "providers/project";

export const GoalAddProjectCard = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const { getSelectedGoal } = useGoal();
  const { createProject } = useProject();

  const handleHideInput = async () => {
    if (projectName === "") {
      setShowInput(false);
    }
  };

  const handleInputChange = async (e) => {
    setProjectName(e.target.value);
  };

  const handleCreateProject = async () => {
    setLoading(true);
    await createProject(getSelectedGoal()!.id, projectName);
    setLoading(false);
    setProjectName("");
  };

  return (
    <>
      {showInput ? (
        <Card
          className={styles["project-card-creator"]}
          actions={[
            loading ? <Spin size="small" /> : <PlusCircleOutlined onClick={handleCreateProject} />,
          ]}
        >
          <Input.TextArea
            size="small"
            className={clsx(styles["create-project-input"], "ant-typography h3")}
            placeholder="Add a new project"
            aria-selected={true}
            onChange={handleInputChange}
            onBlur={handleHideInput}
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
          onClick={() => setShowInput((prevShowInput) => !prevShowInput)}
          color="default"
          variant="filled"
          size="large"
          className={styles["project-card-button-creator"]}
        >
          Add A New Project
        </Button>
      )}
    </>
  );
};
