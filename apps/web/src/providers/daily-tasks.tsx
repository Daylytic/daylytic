import { Task } from "types/task";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { client } from "services/api-client";
import { debounce } from "utils/utils";

interface DailyTasksContextType {
  tasks: Task[];
  selectedTask: Task | undefined;
  setSelectedTask: (task: Task | undefined) => void;
  createTask: (title: string) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
}

const DailyTasksContext = React.createContext<
  DailyTasksContextType | undefined
>(undefined);

// Provider Component
export const DailyTasksProvider = ({ token, children }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

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

  const createTask = async (title: string) => {
    try {
      const { data } = await client.POST("/routine/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: { title, taskType: "ROUTINE" },
      });

      setTasks((prevTasks) => [...prevTasks, data as Task]);

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
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: { id },
      });
      return data;
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const taskIndex = tasks.findIndex(
        (existingTask) => task.id === existingTask.id
      );
      const lastSavedTask = tasks[taskIndex];

      setTasks((prevTasks) => {
        if (taskIndex === -1) {
          // If the task doesn't exist, return the current tasks unmodified
          return prevTasks;
        }
        // Create a new array with the updated task
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = task;
        return updatedTasks;
      });

      // Optimized debounced save function
      debounce(async (updatedTask: Task) => {
        // Compare the updated task with the last saved version
        if (
          updatedTask.title === lastSavedTask.current.title &&
          updatedTask.description === lastSavedTask.current.description
        ) {
          console.log("No changes to save");
          return; // Skip saving if there are no changes
        }

        await client.PUT("/routine/", {
          params: {
            header: { authorization: `Bearer ${token}` },
          },
          body: {
            ...task,
            taskType: "ROUTINE",
          },
        });
      }, 3000); // Delay of 1 second

      // await fetchTasks(); // Refresh tasks after creating
      // return data as Task;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
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
        fetchTasks,
        createTask,
        deleteTask,
        updateTask,
        selectedTask,
        setSelectedTask,
      }}
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
