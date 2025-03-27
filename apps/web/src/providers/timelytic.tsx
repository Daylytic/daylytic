import dayjs from "dayjs";
import { useAnalytics } from "~/providers/analytics";
import { usePanelFetcher } from "~/providers/panel-fetcher";
import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "~/services/api-client";
import { Timelytic } from "~/types/timelytic";

interface TimelyticContextType {
  fetched: boolean;
  timelytic: Timelytic | undefined;
  resetTimelytic: (newTimelytic: Timelytic) => Promise<void>;
  endTimelytic: (newTimelytic: Timelytic) => Promise<void>;
  continueTimelytic: (newTimelytic: Timelytic) => Promise<void>;
  pauseTimelytic: (newTimelytic: Timelytic) => Promise<void>;
}

const TimelyticContext = React.createContext<TimelyticContextType | undefined>(undefined);

export const TimelyticProvider = ({ children }) => {
  const { token } = usePanelFetcher();
  const { fetchAnalytics } = useAnalytics();
  const [timelytic, setTimelytic] = useState<Timelytic | undefined>(undefined);
  const [fetched, setFetched] = useState<boolean>(false);
  const fetching = useRef<boolean>(false);
  const fetchTimelytic = async () => {
    try {
      const { data } = await client.GET("/timelytic/", {
        params: { header: { authorization: `Bearer ${token}` } },
      });
      setTimelytic(data ?? undefined);
      setFetched(true);
      fetching.current = false;
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const resetTimelytic = async (newTimelytic: Timelytic) => {
    try {
      setTimelytic(newTimelytic);
      await client.PUT("/timelytic/reset", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: { duration: newTimelytic.duration, time: dayjs().utc().toISOString() },
      });
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const endTimelytic = async (newTimelytic: Timelytic) => {
    try {

      // Update local timelytic state first
      setTimelytic(newTimelytic);

      // Call the server API to end the session.
      await client.PUT("/timelytic/end", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: { time: dayjs().utc().toISOString() },
      });

      fetchAnalytics();
    } catch (error) {
      console.error("Failed to end timelytic:", error);
    }
  };

  const continueTimelytic = async (newTimelytic: Timelytic) => {
    try {
      setTimelytic(newTimelytic);
      await client.PUT("/timelytic/continue", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: { time: dayjs().utc().toISOString() },
      });
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const pauseTimelytic = async (newTimelytic: Timelytic) => {
    try {
      setTimelytic(newTimelytic);
      await client.PUT("/timelytic/pause", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: { time: dayjs().utc().toISOString() },
      });
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  useEffect(() => {
    if (timelytic === undefined && !fetching.current) {
      fetching.current = true;
      fetchTimelytic();
    }
  }, [token]);

  return (
    <TimelyticContext.Provider
      value={{
        fetched,
        timelytic,
        pauseTimelytic,
        continueTimelytic,
        endTimelytic,
        resetTimelytic,
      }}
    >
      {children}
    </TimelyticContext.Provider>
  );
};

export const useTimelytic = () => {
  const context = useContext(TimelyticContext);
  if (!context) {
    throw new Error("useTimelytic must be used within a TimelyticProvider");
  }
  return context;
};
