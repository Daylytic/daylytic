import Title from "antd/es/typography/Title";
import { ActionDataProps } from "../action";
import { generateTasks } from "utils/utils";
import { Button, Col, Flex, Input, Popconfirm, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { goals } from "@daylytic/shared/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useDailyTasks } from "providers/daily-tasks";
import { useState } from "react";

export const Routine = ({ id }: ActionDataProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Local loading state
  const { tasks, updateTask, deleteTask } = useDailyTasks();
  const task = tasks.find((element) => element.id === id);

  // State to hold title and description

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  if (!task) {
    return <></>;
  }

  return (
    <>
      <Title level={2}>Task</Title>
      <Input
        maxLength={goals.MAX_GOAL_TITLE_LENGTH}
        placeholder="Enter title"
        showCount
        value={title} // Bind input to state
        onChange={(e) => setTitle(e.target.value)} // Update state on change
      />
      <TextArea
        showCount
        maxLength={goals.MAX_GOAL_DESCRIPTION_LENGTH}
        placeholder="Enter description"
        style={{ height: "90px", resize: "none" }}
        value={description} // Bind input to state
        onChange={(e) => setDescription(e.target.value)} // Update state on change
      />
      <div style={{ flex: 1 }}></div>
      <Flex gap={"5px"} justify="center" style={{ width: "100%" }}>
        <Col flex={1}>
          <Popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              await deleteTask(id);
              navigate("/panel/routine");
            }}
          >
            <Button block>Delete Task</Button>
          </Popconfirm>
        </Col>

        <Col flex={1}>
          <Button
            block
            type="primary"
            loading={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await updateTask({ ...task, title, description }); // Pass updated title and description
                setLoading(false);
              } catch (err) {}
              setLoading(false);
            }}
          >
            Save Task
          </Button>
        </Col>
      </Flex>
    </>
  );
};
