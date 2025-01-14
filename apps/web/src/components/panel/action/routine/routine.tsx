import Title from "antd/es/typography/Title";
import { ActionDataProps } from "../action";
import { generateTasks } from "utils/utils";
import { Button, Col, Flex, Input, Popconfirm, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { goals } from "@daylytic/shared/constants";
import { useDailyTasks } from "hooks/use-daily-tasks";
import { useCookies } from "react-cookie";

export const Routine = ({ id }: ActionDataProps) => {
  const [cookies] = useCookies(["token"]);
  const { tasks, createTask } = useDailyTasks(cookies.token);
  const task = tasks.find((element) => element.id === id);

  if (!task) {
    return <></>;
  }

  return (
    <>
      <Title level={2}>Task</Title>
      <Input
        maxLength={goals.MAX_GOAL_TITLE_LENGTH}
        placeholder={task.title}
        showCount
      />
      <TextArea
        showCount
        maxLength={goals.MAX_GOAL_DESCRIPTION_LENGTH}
        onChange={console.log}
        placeholder={"Description friuenbfeiurwhnf"}
        style={{ height: "90px", resize: "none" }}
      />
      <div style={{ flex: 1 }}></div>
      <Flex gap={"5px"} justify="center" style={{ width: "100%" }}>
        <Col flex={1}>
          <Popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
          >
            <Button block>Delete Task</Button>
          </Popconfirm>
        </Col>

        <Col flex={1}>
          <Button block type="primary">
            Save Task
          </Button>
        </Col>
      </Flex>
    </>
  );
};
