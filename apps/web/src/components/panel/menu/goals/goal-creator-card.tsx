import { Button, Card, Input, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "./goals.module.css";
import clsx from "clsx";
import { useGoal } from "providers/goal";
import { useState } from "react";

export const GoalCreatorCard = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [goalDescription, setGoalDescription] = useState<string>("");
  const { createGoal } = useGoal();

  const handleHideInput = async () => {
    if (goalTitle == "" && goalDescription == "") {
      setShowInput(false);
    }
  }

  const handleTitleChange = async (e) => {
    setGoalTitle(e.target.value);
  };

  const handleDescriptionChange = async (e) => {
    setGoalDescription(e.target.value);
  };

  const handleCreateGoal = async () => {
    if(goalTitle === "" || goalDescription === "") {
      return;
    }

    setLoading(true);
    await createGoal(goalTitle, goalDescription);
    setLoading(false);
    setGoalTitle("");
    setGoalDescription("");
    setShowInput(false);
  };

  return (
    <>
      {showInput ? (
        <Card
          className={styles.card}
          actions={[
            loading ? <Spin size="small" /> : <PlusCircleOutlined onClick={handleCreateGoal} />,
          ]}
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
          onClick={() => setShowInput((prevShowInput) => !prevShowInput)}
          color="default"
          variant="filled"
          size="large"
          className={clsx(styles["goal-creator"])}
          icon={<PlusCircleOutlined />}
        >
          Add A New Goal
        </Button>
      )}
    </>
  );
};
