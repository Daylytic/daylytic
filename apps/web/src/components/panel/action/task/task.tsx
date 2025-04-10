import { Action } from "~/components/panel/action";
import { TaskAction } from "~/components/panel/action/task/task-action";
import { useLayout } from "~/providers/layout";

export const Task = () => {
  const { showAction } = useLayout();

  if (!showAction) {
    return <></>;
  }

  return (
    <Action>
      <TaskAction />
    </Action>
  );
};
