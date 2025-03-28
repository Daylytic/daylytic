import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "~/services/api-client";
import { Goal, Project } from "~/types/goal";
import { Task } from "~/types/task";

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
  const [routineData, setRoutineData] = useState<Task[] | undefined>([]);

  const [fetched, setFetched] = useState<boolean>(false);
  const fetching = useRef<boolean>(false);

  const fetchAll = async () => {
    try {
      const { data } = await client.GET("/goal/all", {
        params: { header: { authorization: `Bearer ${token}` } },
      });

      const { data: routineData } = await client.GET("/task/routine", {
        params: { header: { authorization: `Bearer ${token}` } },
      });

      setRoutineData(routineData);
      setData(data);
      setFetched(true);
      fetching.current = false;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  /*

  I know for a fact this is not the best approach for dividing the data, but I don't have time to refactor it right now.
  I will leave it as is for now, but please consider refactoring it in the future.
  
  */

  // eslint-disable-next-line
  const getGoalsData = (): Goal[] => data?.map(({ projects, ...rest }) => ({ ...rest })) ?? [];
  const getProjectsData = (): Project[] =>
    data?.flatMap(({ projects }) =>
      // eslint-disable-next-line
      (projects || []).map(({ tasks, ...rest }) => rest),
    ) ?? [];

  const getTasksData = (): Task[] =>
    data
      ? data!
          // eslint-disable-next-line
          .flatMap((goal) => (goal as any).projects || [])
          .flatMap((project) => project.tasks || [])
          .concat(routineData ?? [])
      : [];

  useEffect(() => {
    if (token && data?.length === 0 && !fetching.current) {
      fetching.current = true;
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
