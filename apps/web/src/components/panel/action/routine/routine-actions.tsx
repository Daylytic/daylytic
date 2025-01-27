import { Col, Button, Flex, Popconfirm } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./routine.module.css";

export const RoutineActions = () => {
  const [loading, setLoading] = useState(false);
  const { updateTask, deleteTask, selectedTask } = useDailyTasks();
  const navigate = useNavigate();

  return (
    <Flex gap={"small"} id={styles["actions-wrapper"]}>
      <Col className={styles.action}>
        <Popconfirm
          title="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            deleteTask(selectedTask!.id);
            navigate("/panel/routine");
          }}
        >
          <Button block>Delete Task</Button>
        </Popconfirm>
      </Col>

      <Col className={styles.action}>
        <Button
          block
          type="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            try {
              updateTask(selectedTask!);
              setLoading(false);
            } catch (err) {
              setLoading(false);
            }
          }}
        >
          Save Task
        </Button>
      </Col>
    </Flex>
  );
};
