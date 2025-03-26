import { Empty } from "antd";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router";
import { TaskList } from "~/components/common/task/task-list";
import { useProject } from "~/providers/project";
import { useTask } from "~/providers/task";
import { Task } from "~/types/task";
import { dateFormat } from "~/utils/date";
import { getCalendarRoute } from "~/utils/routes";

export const useCalendar = () => {
  const { date, taskId } = useParams();
  const parsedDate = dayjs(date, dateFormat, true);
  const { tasks, fetched, updateTasks } = useTask();
  const { projects } = useProject();

  const navigate = useNavigate();

  const daysTasks = tasks.filter((task) => {
    const taskDate = dayjs(task.deadline);
    return taskDate.isValid() && taskDate.format(dateFormat) === date;
  });

  const getGoalId = (task: Task): string | undefined => {
    const tasksProject = projects.find((project) => project.id === task.projectId);
    if (!tasksProject) {
      return;
    }

    return tasksProject.goalId;
  };

  const renderTasks = () => {
    if (daysTasks.length < 1 && fetched) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="You have nothing to do this day."
        />
      );
    }

    return (
      <TaskList
        tasks={daysTasks}
        fetched={fetched}
        dnd={false}
        handleTaskClick={(task) => {
          const goalId = getGoalId(task);
          if (!goalId) return;

          navigate(getCalendarRoute(date!, goalId, task.id));
        }}
        handleTaskUpdate={async (task: Task): Promise<void> => {
          await updateTasks([task], true);
        }}
      />
    );
  };

  return { renderTasks, taskId, parsedDate, date };
};
