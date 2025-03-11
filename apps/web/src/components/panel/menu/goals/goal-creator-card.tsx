import { Button, Card, Input, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "./goals.module.css";
import clsx from "clsx";
import { useGoal } from "providers/goal";
import { useState } from "react";

export const GoalCreatorCard = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const { getSelectedGoal, createProject } = useGoal();

  const handleInputChange = async (e) => {
    setProjectName(e.target.value);
  };

  const handleCreateProject = async () => {
    setLoading(true);
    await createProject(getSelectedGoal()!.id, projectName);
  };

  return (
    <>
      {showInput ? (
        <Card
          className={styles.card}
          actions={[
            loading ? <Spin size="small" /> : <PlusCircleOutlined onClick={handleCreateProject} />,
          ]}
        >
          <Input.TextArea
            size="small"
            className={clsx(styles["create-goal-input-title"], "ant-typography h4")}
            placeholder="Goal Title"
            aria-selected={true}
            onChange={handleInputChange}
            onBlur={() => {
              if (projectName === "") {
                setShowInput(false);
              }
            }}
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
          className={clsx(styles["goal-creator"])}
        >
          Add A New Project
        </Button>
      )}
    </>
  );
};
