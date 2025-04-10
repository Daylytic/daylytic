import { usePanelFetcher } from "~/providers/panel-fetcher";
import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "~/services/api-client";
import { Assistance } from "~/types/assistance";

interface AssistanceContextType {
  fetched: boolean;
  assistances: Assistance[];
  fetchAssistances: () => Promise<void>;
  createAssistance: (questions: { [key: string]: string | number }) => Promise<Assistance | undefined>;
}

const AssistanceContext = React.createContext<AssistanceContextType | undefined>(undefined);

export const AssistanceProvider = ({ children }) => {
  const { token } = usePanelFetcher();
  const [assistances, setAssistances] = useState<Assistance[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const fetching = useRef<boolean>(false);
  const fetchAssistances = async () => {
    try {
      const { data } = await client.GET("/assistance/", {
        params: { header: { authorization: `Bearer ${token}` } },
      });
      setAssistances(data ?? []);
      setFetched(true);
      fetching.current = false;
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const createAssistance = async (questions: {
    [key: string]: string | number;
  }): Promise<Assistance | undefined> => {
    try {
      const { data } = await client.POST("/assistance/", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: questions,
      });

      if (!data) throw Error("No data received");
      setAssistances((prev) => [...prev, data!]);
      return data;
    } catch (error) {
      console.error("Failed to create assistance:", error);
    }
  };

  useEffect(() => {
    if (assistances.length < 1 && !fetching.current) {
      fetching.current = true;
      fetchAssistances();
    }
  }, [token]);

  return (
    <AssistanceContext.Provider
      value={{
        fetched,
        assistances,
        fetchAssistances,
        createAssistance,
      }}
    >
      {children}
    </AssistanceContext.Provider>
  );
};

export const useAssistance = () => {
  const context = useContext(AssistanceContext);
  if (!context) {
    throw new Error("useAssistance must be used within a AssistanceProvider");
  }
  return context;
};
