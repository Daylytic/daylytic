
import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "~/services/api-client";
import { Statistics } from "~/types/statistics";

interface StatisticsContextType {
  fetched: boolean;
  statistics: Statistics | undefined;
}

const StatisticsContext = React.createContext<StatisticsContextType | undefined>(undefined);

export const StatisticsProvider = ({ children }) => {
  const [statistics, setStatistics] = useState<Statistics | undefined>(undefined);
  const [fetched, setFetched] = useState<boolean>(false);
  const fetching = useRef<boolean>(false);

  const fetchStatistics = async () => {
    try {
      const { data } = await client.GET("/stats/");
      setStatistics(data ?? undefined);
      setFetched(true);
      fetching.current = false;
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  useEffect(() => {
    if (statistics === undefined && !fetching.current) {
      fetching.current = true;
      fetchStatistics();
    }
  }, []);

  return (
    <StatisticsContext.Provider
      value={{
        fetched,
        statistics,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error("useStatistics must be used within a StatisticsProvider");
  }
  return context;
};
