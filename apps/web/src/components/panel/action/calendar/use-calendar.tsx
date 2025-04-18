import { Empty } from "antd";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router";
import { TaskList } from "~/components/common/task/task-list";
import { useProject } from "~/providers/project";
import { useSelectedTask } from "~/providers/selected-task";
import { useTask } from "~/providers/task";
import { Task } from "~/types/task";
import { dateFormat } from "~/utils/date";
import { getCalendarRoute } from "~/utils/routes";

export const useCalendar = () => {
  const { date, taskId } = useParams();
  const { setSelectedTask } = useSelectedTask();
  const parsedDate = dayjs(date, dateFormat, true);
  const { tasks, fetched, updateTasks } = useTask();
  const { projects } = useProject();

  const navigate = useNavigate();

  const daysTasks = tasks.filter((task) => {
    const taskDate = dayjs(task.deadline);
    return (
      taskDate.isValid() && taskDate.format(dateFormat) === date && task.taskType !== "ROUTINE"
    );
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
        isCalendar={true}
        handleTaskClick={(task) => {
          setSelectedTask(task);
          switch (task.taskType) {
            case "EVENT":
              navigate(getCalendarRoute(date!, task.id));
              break;
            case "PROJECT": {
              const goalId = getGoalId(task);
              if (!goalId) return;

              navigate(getCalendarRoute(date!, goalId, task.id));
              break;
            }
            default:
              break;
          }
        }}
        handleTaskUpdate={async (task: Task): Promise<void> => {
          await updateTasks([task], true);
        }}
      />
    );
  };

  return { renderTasks, taskId, parsedDate, date };
};
