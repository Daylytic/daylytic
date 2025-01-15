import { Task } from "components/panel/content/routine/routine";
import React, { createContext, useContext, useEffect, useState } from "react";
import { client } from "services/api-client";

interface DailyTasksContextType {
  tasks: Task[];
  createTask: (title: string) => void;
  deleteTask: (id: string) => void;
  fetchTasks: () => void;
  updateTask: (task: Task) => void;
}

const DailyTasksContext = React.createContext<
  DailyTasksContextType | undefined
>(undefined);

// Provider Component
export const DailyTasksProvider = ({ token, children }) => {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const { data } = await client.GET("/routine/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
      });
      setTasks(data ?? []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const createTask = async (title) => {
    try {
      const { data } = await client.POST("/routine/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: { title },
      });
      await fetchTasks(); // Refresh tasks after creating
      return data;
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await client.DELETE("/routine/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: { id },
      });
      await fetchTasks(); // Refresh tasks after deleting
      return data;
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const { data } = await client.PUT("/routine/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: {
          id: task.id,
          title: task.title,
          description: task.description,
          isCompleted: task.isCompleted,
        },
      });
      await fetchTasks(); // Refresh tasks after creating
      return data;
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return (
    <DailyTasksContext.Provider
      value={{ tasks, fetchTasks, createTask, deleteTask, updateTask }}
    >
      {children}
    </DailyTasksContext.Provider>
  );
};

// Custom Hook to Use Context
export const useDailyTasks = () => {
  const context = useContext(DailyTasksContext);
  if (!context) {
    throw new Error("useDailyTasks must be used within a DailyTasksProvider");
  }
  return context;
};
