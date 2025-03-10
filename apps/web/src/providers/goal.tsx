/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { client } from "services/api-client";
import { Goal, Project } from "types/goal";
import { Task } from "types/task";

interface GoalContextType {
  goals: Goal[];
  projects: Project[];
  tasks: Task[];
  selectedGoal: React.MutableRefObject<Goal | undefined>;
  selectedProject: React.MutableRefObject<Project | undefined>;
  selectedTask: React.MutableRefObject<Task | undefined>;

  fetched: boolean;
  fetchAll: () => Promise<void>;
  getSelectedGoal: () => Goal | undefined;
  createProject: (goalId: string, title: string) => Promise<void>;
  createGoal: (title: string, description: string) => Promise<void>;
  createTask: (goalId: string, projectId: string, title: string) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
}

const GoalContext = React.createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ token, children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const selectedGoal = useRef<Goal | undefined>(undefined);
  const selectedProject = useRef<Project | undefined>(undefined);
  const selectedTask = useRef<Task | undefined>(undefined);

  const [fetched, setFetched] = useState<boolean>(false);

  const globalUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const pendingChangesRef = useRef<Map<string, Task>>(new Map());

  const { goalId, projectId } = useParams();

  const getSelectedGoal = () => goals.find((goal) => goal.id === goalId);

  const recalculatePositions = (tasks: Task[]): Task[] => {
    return tasks
      .sort((a, b) => a.position - b.position)
      .map((task, index) => ({ ...task, position: index }));
  };

  const fetchAll = async () => {
    try {
      const { data } = await client.GET("/goal/all", {
        params: { header: { authorization: `Bearer ${token}` } },
      });

      const goalsData = data ?? [];
      setGoals(goalsData);

      const projectsData = goalsData.flatMap((goal) => goal.projects || []);
      setProjects(projectsData);

      const tasksData = projectsData.flatMap((project) => project.tasks || []);
      setTasks(tasksData);

      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const createGoal = async (title: string, description: string) => {
    try {
      const { data } = await client.POST("/goal/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: { title, description },
      });

      setGoals((prevGoals) => [...prevGoals, data!]);
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const createProject = async (goalId: string, title: string) => {
    try {
      const { data } = await client.POST("/goal/{goalId}/project/", {
        params: {
          path: { goalId },
          header: { authorization: `Bearer ${token}` },
        },
        body: { title },
      });

      setProjects((prevProjects) => [...prevProjects, data!]);
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
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
          await client.PUT("/goal/{goalId}/project/{projectId}/task/", {
            params: {
              header: { authorization: `Bearer ${token}` },
              path: {
                goalId: getSelectedGoal()!.id,
                projectId: task.projectId!,
              },
            },
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

  const deleteTask = async (task: Task) => {
    setTasks((prevTasks) => recalculatePositions(prevTasks.filter((filterTask) => filterTask.id !== task.id)));

    try {
      await client.DELETE("/goal/{goalId}/project/{projectId}/task/{taskId}", {
        params: {
          header: { authorization: `Bearer ${token}` },
          path: {
            goalId: getSelectedGoal()!.id,
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
    if (token && goals.length === 0) {
      fetchAll();
    }
  }, [token]);

  return (
    <GoalContext.Provider
      value={{
        goals,
        projects,
        tasks,
        selectedGoal,
        selectedProject,
        selectedTask,
        fetched,
        fetchAll,
        getSelectedGoal,
        createProject,
        createGoal,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoal must be used within a GoalProvider");
  }
  return context;
};
