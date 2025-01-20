import { Col, Button, Flex, Popconfirm } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { useState } from "react";
import { useNavigate } from "react-router";

export const RoutineActions = () => {
  const [loading, setLoading] = useState(false);
  const { updateTask, selectedTask, deleteTask } = useDailyTasks();
  const navigate = useNavigate();

  return <Flex gap={"5px"} justify="center" style={{ width: "100%" }}>
    <Col flex={1}>
      <Popconfirm
        title="Are you sure delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={async () => {
          await deleteTask(selectedTask!.id);
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
            console.log(selectedTask);
            await updateTask(selectedTask!);
            setLoading(false);
          } catch (err) {
            setLoading(false);
          }
        }}
      >
        Save Task
      </Button>
    </Col>
  </Flex>;
};
