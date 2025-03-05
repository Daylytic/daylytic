import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "services/api-client";
import { Task } from "types/task";

interface DailyTasksContextType {
  tasks: Task[];
  selectedTask: React.MutableRefObject<Task | undefined>;
  fetched: boolean;
  createTask: (title: string) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
}

const DailyTasksContext = React.createContext<DailyTasksContextType | undefined>(undefined);

export const DailyTasksProvider = ({ token, children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const selectedTask = useRef<Task | undefined>(undefined);

  const globalUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const pendingChangesRef = useRef<Map<string, Task>>(new Map());

  const recalculatePositions = (tasks: Task[]): Task[] => {
    return tasks
      .sort((a, b) => a.position - b.position)
      .map((task, index) => ({ ...task, position: index }));
  };

  const fetchTasks = async () => {
    try {
      const { data } = await client.GET("/routine/", {
        params: { header: { authorization: `Bearer ${token}` } },
      });
      setTasks(data ?? []);
      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const createTask = async (title: string) => {
    try {
      const { data } = await client.POST("/routine/", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: { title, taskType: "ROUTINE" },
      });
      setTasks((prevTasks) => recalculatePositions([...prevTasks, data!]));
      return data as Task;
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    try {
      const { data } = await client.DELETE("/routine/", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: { id },
      });
      setTasks((prevTasks) => recalculatePositions(prevTasks));
      return data;
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  const updateTask = async (task: Task) => {
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex((t) => t.id === task.id);
      if (index === -1) return prevTasks;
      const updatedTask = { ...prevTasks[index], ...task };
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = updatedTask;
      pendingChangesRef.current.set(task.id, updatedTask);
      return updatedTasks;
    });

    // Reset the global debounce timer.
    if (globalUpdateTimeout.current) {
      clearTimeout(globalUpdateTimeout.current);
    }
    globalUpdateTimeout.current = setTimeout(async () => {
      // When timer fires, extract all pending changes.
      const tasksToUpdate = Array.from(pendingChangesRef.current.values());
      if (tasksToUpdate.length > 0) {
        try {
          await client.PUT("/routine/", {
            params: { header: { authorization: `Bearer ${token}` } },
            body: tasksToUpdate,
          });
          console.log("Tasks updated successfully in the database.");
          // Clear the pending changes after the successful update.
          pendingChangesRef.current.clear();
        } catch (error) {
          console.error("Failed to update tasks:", error);
        }
      }
    }, 3000); // Global debounce delay: 3 seconds
  };

  useEffect(() => {
    if (token && tasks.length === 0) {
      fetchTasks();
    }
  }, [token]);

  return (
    <DailyTasksContext.Provider
      value={{
        tasks,
        fetched,
        fetchTasks,
        createTask,
        deleteTask,
        updateTask,
        selectedTask,
      }}
    >
      {children}
    </DailyTasksContext.Provider>
  );
};

export const useDailyTasks = () => {
  const context = useContext(DailyTasksContext);
  if (!context) {
    throw new Error("useDailyTasks must be used within a DailyTasksProvider");
  }
  return context;
};
