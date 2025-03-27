import { Empty, CollapseProps, Collapse } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { TaskList } from "~/components/common/task/task-list";
import { useProject } from "~/providers/project";
import { useTask } from "~/providers/task";
import { Task } from "~/types/task";
import { getGoalRoute } from "~/utils/routes";

export const useSuggestions = () => {
  const navigate = useNavigate();
  const { tasks, fetched, updateTasks } = useTask();
  const { projects } = useProject();

  const filteredTasks = tasks.filter((task) => {
    return task.taskType === "PROJECT" && !task.isCompleted;
  });

  const overWeekOld = filteredTasks.filter((task) => {
    return dayjs(task.updatedAt).isBefore(dayjs().subtract(7, "day"));
  });

  const overDayOld = filteredTasks.filter((task) => {
    return dayjs(task.updatedAt).isBefore(dayjs().subtract(24, "hour"));
  });

  const getGoalId = (task: Task): string | undefined => {
    const tasksProject = projects.find((project) => project.id === task.projectId);
    if (!tasksProject) {
      return;
    }

    return tasksProject.goalId;
  };

  const tasksList = (tasks: Task[]) => {
    return (
      <TaskList
        tasks={tasks}
        fetched={fetched}
        dnd={false}
        handleTaskClick={(task) => {
          const goalId = getGoalId(task);
          if (!goalId) return;

          navigate(getGoalRoute(goalId, task.id));
        }}
        handleTaskUpdate={async (task: Task): Promise<void> => {
          const goalId = getGoalId(task);
          if (!goalId) return;

          await updateTasks([task], true);
        }}
      />
    );
  };

  const renderTasks = () => {
    if (filteredTasks.length < 1 && fetched) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="You have done all of your tasks! Well done."
        />
      );
    }

    const items: CollapseProps["items"] = [];

    if (overWeekOld.length > 0) {
      items.push({
        key: "1",
        label: "Week Old Tasks",
        children: tasksList(overWeekOld),
      });
    }

    if (overDayOld.length > 0) {
      items.push({
        key: "2",
        label: "Day Old Tasks",
        children: tasksList(overDayOld),
      });
    }

    return items.length > 0 ? <Collapse items={items} /> : tasksList(filteredTasks);
  };

  return { renderTasks };
};
