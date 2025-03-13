/* eslint-disable */
import { usePanelFetcher } from "providers/panel-fetcher";
import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "services/api-client";
import { Task } from "types/task";

interface TaskContextType {
  tasks: Task[];
  selectedTask: React.MutableRefObject<Task | undefined>;

  fetched: boolean;

  createTask: (goalId: string, projectId: string, title: string) => Promise<void>;
  updateTasks: (tasksByGoal: Record<string, Task[]>, immediatelyUpdate) => Promise<void>;
  deleteTask: (task: Task, goalId: string) => Promise<void>;
  forceRender: React.Dispatch<React.SetStateAction<number>>;
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }) => {
  const { getTasksData, token, data } = usePanelFetcher();

  const [tasks, setTasks] = useState<Task[]>([]);
  const selectedTask = useRef<Task | undefined>(undefined);

  const [fetched, setFetched] = useState<boolean>(false);

  const globalUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const pendingChangesRef = useRef<Map<string, Task>>(new Map());

  const [, forceRender] = useState(0);

  const recalculatePositions = (tasks: Task[]): Task[] => {
    return tasks
      .sort((a, b) => a.position - b.position)
      .map((task, index) => ({ ...task, position: index }));
  };

  const fetchAll = async () => {
    try {
      const data = getTasksData();
      setTasks(data);

      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const createTask = async (goalId: string, projectId: string, title: string) => {
    try {
      const { data } = await client.POST("/goal/{goalId}/project/{projectId}/task/", {
        params: {
          path: { goalId, projectId },
          header: { authorization: `Bearer ${token}` },
        },
        body: { title },
      });
      setTasks((prevTasks) => recalculatePositions([...prevTasks, data!]));
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateTasks = async (
    tasksByGoal: Record<string, Task[]>,
    immediatelyUpdate: boolean = false,
  ) => {
    console.log(tasksByGoal)
    const now = new Date().toISOString();

    Object.values(tasksByGoal).forEach((tasks) => {
      tasks.forEach((task) => {
        task.updatedAt = now;
        pendingChangesRef.current.set(task.id, { ...task });
      });
    });

    if (immediatelyUpdate) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => {
          const updatedTask = Object.values(tasksByGoal)
            .flat()
            .find((task) => task.id === t.id);
          return updatedTask ? { ...t, ...updatedTask } : t;
        }),
      );
    }

    if (globalUpdateTimeout.current) {
      clearTimeout(globalUpdateTimeout.current);
    }

    globalUpdateTimeout.current = setTimeout(async () => {
      const tasksToUpdate = Array.from(pendingChangesRef.current.values());
      if (tasksToUpdate.length > 0) {
        try {
          for (const [goalId, tasks] of Object.entries(tasksByGoal)) {
            console.log([goalId, tasks])
            await client.PUT("/goal/{goalId}/project/{projectId}/task/", {
              params: {
                header: { authorization: `Bearer ${token}` },
                path: {
                  goalId: goalId,
                  projectId: tasks[0].projectId!, // Assuming all tasks in this group belong to the same project
                },
              },
              body: tasks,
            });
          }

          console.log("Tasks updated successfully in the database.");
          pendingChangesRef.current.clear();
        } catch (error) {
          console.error("Failed to update tasks:", error);
        }
      }
    }, 3000);
  };

  const deleteTask = async (task: Task, goalId: string) => {
    setTasks((prevTasks) =>
      recalculatePositions(prevTasks.filter((filterTask) => filterTask.id !== task.id)),
    );

    try {
      await client.DELETE("/goal/{goalId}/project/{projectId}/task/{taskId}", {
        params: {
          header: { authorization: `Bearer ${token}` },
          path: {
            goalId: goalId,
            projectId: task.projectId!,
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
  }, [data]);

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
