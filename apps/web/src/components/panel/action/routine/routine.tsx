import { Flex, Skeleton, Spin } from "antd";
import { useEffect } from "react";
import { RoutineSettings } from "./routine-settings";
import styles from "./routine.module.css";
import { RoutineHeader } from "./routine-header";
import { useDailyTasks } from "providers/daily-tasks";
import { Lexical } from "components/common/editor";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const Routine = ({ id }) => {
  const { tasks, selectedTask, updateTask, fetched } = useDailyTasks();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTask.current === undefined) {
      const task = tasks.find((task) => task.id === id);
      selectedTask.current = task;

      // If tasks fetched, and selectedTask is not selected, navigate back to /panel/routine
      if (fetched && !task) {
        navigate("/panel/routine");
      }
    }
  });

  // if (selectedTask.current === undefined) {
  //   return (
  //     <Flex justify="center" align="center" style={{ height: "100%", width: "100%" }}>
  //       <Spin indicator={<LoadingOutlined spin />} size="large" />
  //     </Flex>
  //   );
  // }

  return (
    <Flex vertical id={styles["wrapper"]} gap={selectedTask.current === undefined ? "small" : 0}>
      <RoutineHeader />
      <RoutineSettings />

      {selectedTask.current ? (
        <Lexical
          key={selectedTask.current.id}
          selectedTask={selectedTask.current}
          onChange={(editor) => {
            selectedTask!.current!.content = editor.toJSON();
            updateTask(selectedTask!.current!);
          }}
        />
      ) : (
        <Flex vertical gap={"small"}>
          <Skeleton.Button active block={true} />
          <Skeleton active />
        </Flex>
      )}
    </Flex>
  );
};
