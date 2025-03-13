/* eslint-disable */
import { components } from "lib/api/schema";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { client } from "services/api-client";

// Define the Task type
type Task = {
  id: components["schemas"]["def-3"]["GoalSchema"]["id"];
  position: number;
  taskType: "ROUTINE" | "PROJECT";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "OPTIONAL" | null;
  title: string;
  content: number | string | boolean | unknown[] | { [key: string]: unknown };
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
  projectId: components["schemas"]["def-3"]["GoalSchema"]["id"] | null;
  userId: components["schemas"]["def-3"]["GoalSchema"]["id"] | null;
  tagIds: components["schemas"]["def-3"]["GoalSchema"]["id"][];
};

// Define the Project type
type Project = {
  id: components["schemas"]["def-3"]["GoalSchema"]["id"];
  position: number;
  title: string;
  goalId: components["schemas"]["def-3"]["GoalSchema"]["id"];
  tasks: Task[];
};

// Define the Goal type
type Goal = {
  id: components["schemas"]["def-3"]["GoalSchema"]["id"];
  title: components["schemas"]["def-3"]["GoalSchema"]["title"];
  description: components["schemas"]["def-3"]["GoalSchema"]["description"];
  userId: components["schemas"]["def-3"]["GoalSchema"]["id"];
  projects: Project[];
};

interface PanelFetcherContextType {
  getGoalsData: () => Goal[];
  getProjectsData: () => Project[];
  getTasksData: () => Task[];
  data: Goal[] | undefined;
  fetched: boolean;
  token: string;
}

const PanelFetcherContext = React.createContext<PanelFetcherContextType | undefined>(undefined);

export const PanelFetcherProvider = ({ token, children }) => {
  const [data, setData] = useState<Goal[] | undefined>([]);

  const [fetched, setFetched] = useState<boolean>(false);

  const fetchAll = async () => {

    try {
      const { data } = await client.GET("/goal/all", {
        params: { header: { authorization: `Bearer ${token}` } },
      });

      setData(data);
      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const getGoalsData = () => data ?? [];
  const getProjectsData = () => data!.flatMap((goal) => goal.projects || []);
  const getTasksData = () =>
    data!.flatMap((goal) => goal.projects || []).flatMap((project) => project.tasks || []);

  useEffect(() => {
    if (token && data?.length === 0) {
      fetchAll();
    }
  }, [token]);

  return (
    <PanelFetcherContext.Provider
      value={{
        getGoalsData,
        getProjectsData,
        getTasksData,
        fetched,
        token,
        data,
      }}
    >
      {children}
    </PanelFetcherContext.Provider>
  );
};

export const usePanelFetcher = () => {
  const context = useContext(PanelFetcherContext);
  if (!context) {
    throw new Error("usePanelFetcher must be used within a PanelFetcherContext");
  }
  return context;
};
