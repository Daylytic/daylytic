import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { client } from "services/api-client";
import { Task } from "types/task";

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [debouncedUpdates, setDebouncedUpdates] = useState<
    Record<string, NodeJS.Timeout>
  >({});
  const latestTasksRef = useRef(tasks);

  useEffect(() => {
    latestTasksRef.current = tasks;
  }, [tasks]);

  const recalculatePositions = (tasks: Task[]): Task[] => {
    return tasks
      .sort((a, b) => a.position - b.position) // Sort by position
      .map((task, index) => ({ ...task, position: index })); // Reassign positions
  };

  // const moveTaskAndRecalculate = (
  //   taskId: string,
  //   newPosition: number
  // ): Task[] => {
  //   const taskIndex = tasks.findIndex((task) => task.id === taskId);
  //   if (taskIndex === -1) {
  //     throw new Error(`Task with ID ${taskId} not found`);
  //   }
  
  //   const taskToMove = tasks[taskIndex];
  //   const filteredTasks = tasks.filter((task) => task.id !== taskId); // Remove the task to move
  
  //   const reorderedTasks = [
  //     ...filteredTasks.slice(0, newPosition),
  //     { ...taskToMove, position: newPosition }, // Insert the task at the new position
  //     ...filteredTasks.slice(newPosition),
  //   ];
  
  //   // Recalculate positions to ensure they are sequential
  //   return recalculatePositions(reorderedTasks);
  // };
  

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
      setTasks(recalculatePositions(tasks));

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
      setTasks(recalculatePositions(tasks));
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

      setTasks((prevTasks) => {
        if (taskIndex === -1) {
          return prevTasks;
        }

        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...task };
        return updatedTasks;
      });


      if (debouncedUpdates[task.id]) {
        clearTimeout(debouncedUpdates[task.id]); 
      }

      const timeoutId = setTimeout(async () => {
        const latestTasks = latestTasksRef.current;
        const taskToUpdate = latestTasks.find(
          (existingTask) => existingTask.id === task.id
        );

        if (taskToUpdate) {
          try {
            await client.PUT("/routine/", {
              params: {
                header: { authorization: `Bearer ${token}` },
              },
              body: {
                ...taskToUpdate,
                taskType: "ROUTINE",
              },
            });
            console.log(
              `Task ${task.id} updated successfully in the database.`
            );
          } catch (error) {
            console.error(`Failed to update task ${task.id}:`, error);
          }
        }
      }, 3000); // Wait for 3 seconds before saving to database

      setDebouncedUpdates((prev) => ({ ...prev, [task.id]: timeoutId })); // Track timeout for this task
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
