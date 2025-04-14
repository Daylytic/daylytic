import dayjs from "dayjs";
import { useAnalytics } from "~/providers/analytics";
import { usePanelFetcher } from "~/providers/panel-fetcher";
import { useUser } from "~/providers/user";
import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "~/services/api-client";
import { Task, TaskType } from "~/types/task";
import { ISOFormatUTC } from "~/utils/date";

interface TaskContextType {
  tasks: Task[];
  selectedTask: React.MutableRefObject<Task | undefined>;

  fetched: boolean;

  createTask: (
    title: string,
    taskType: TaskType,
    projectId?: string,
    userId?: string,
  ) => Promise<Task>;
  updateTasks: (tasks: Task[], immediatelyUpdate) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  forceRender: React.Dispatch<React.SetStateAction<number>>;
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }) => {
  const { getTasksData, token, fetched: goalsFetched } = usePanelFetcher();
  const { fetchAnalytics } = useAnalytics();
  const { profile } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const selectedTask = useRef<Task | undefined>(undefined);

  const [fetched, setFetched] = useState<boolean>(false);

  const globalUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const pendingChangesRef = useRef<Map<string, Task>>(new Map());

  const [, forceRender] = useState(0);

  const recalculatePositions = (tasks: Task[]): Task[] => {
    return tasks.sort((a, b) => a.position - b.position);
  };

  const fetchAll = async () => {
    try {
      if (!goalsFetched) return;
      const tasksData = getTasksData();
      setTasks(tasksData);

      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const createTask = async (
    title: string,
    taskType: TaskType,
    projectId?: string,
    userId?: string,
  ) => {
    try {
      const { data } = await client.POST("/task/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: { title, projectId, userId, taskType },
      });

      setTasks((prevTasks) => recalculatePositions([...prevTasks, data!]));

      if (!data) {
        throw new Error("Failed to create task: Response data is undefined");
      }
      
      return data as Task;
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateTasks = async (tasks: Task[], immediatelyUpdate: boolean = false) => {
    for (const task of tasks) {
      task.updatedAt = dayjs().utc().toISOString();
      if (task.isCompleted) {
        task.completedAt = dayjs().utc().tz(profile?.timeZone).format(ISOFormatUTC);
      }
      pendingChangesRef.current.set(task.id, { ...task });
    }

    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        const updatedTask = tasks.find((task) => task.id === t.id);
        return updatedTask ? { ...t, ...updatedTask } : t;
      }),
    );

    if (immediatelyUpdate) {
      if (globalUpdateTimeout.current) {
        clearTimeout(globalUpdateTimeout.current);
      }

      const tasksToUpdate = Array.from(pendingChangesRef.current.values());
      try {
        await client.PUT("/task/", {
          params: {
            header: { authorization: `Bearer ${token}` },
          },
          body: tasksToUpdate,
        });
        await fetchAnalytics();
        pendingChangesRef.current.clear();
      } catch (error) {
        console.error("Failed to update tasks:", error);
      }
    } else {
      if (globalUpdateTimeout.current) {
        clearTimeout(globalUpdateTimeout.current);
      }
      globalUpdateTimeout.current = setTimeout(async () => {
        const tasksToUpdate = Array.from(pendingChangesRef.current.values());
        if (tasksToUpdate.length > 0) {
          try {
            await client.PUT("/task/", {
              params: {
                header: { authorization: `Bearer ${token}` },
              },
              body: tasksToUpdate,
            });
            await fetchAnalytics();
            pendingChangesRef.current.clear();
          } catch (error) {
            console.error("Failed to update tasks:", error);
          }
        }
      }, 3000);
    }
  };

  const deleteTask = async (task: Task) => {
    setTasks((prevTasks) =>
      recalculatePositions(prevTasks.filter((filterTask) => filterTask.id !== task.id)),
    );

    try {
      await client.DELETE("/task/{taskId}", {
        params: {
          header: { authorization: `Bearer ${token}` },
          path: {
            taskId: task.id,
          },
        },
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (token && tasks.length === 0) {
      fetchAll();
    }
  }, [token, goalsFetched]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectedTask,
        fetched,
        createTask,
        updateTasks,
        deleteTask,
        forceRender,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
