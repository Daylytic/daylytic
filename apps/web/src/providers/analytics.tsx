import { usePanelFetcher } from "~/providers/panel-fetcher";
import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "~/services/api-client";
import { Analytics } from "~/types/analytics";

interface AnalyticsContextType {
  fetched: boolean;
  analytics: Analytics | undefined;
  updateLocalAnalytics: (analytics: Analytics) => void;
  fetchAnalytics: () => Promise<void>;
}

const AnalyticsContext = React.createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }) => {
  const { token } = usePanelFetcher();
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);
  const [fetched, setFetched] = useState<boolean>(false);
  const fetching = useRef<boolean>(false);

  const fetchAnalytics = async () => {
    try {
      const { data } = await client.GET("/analytics/", {
        params: { header: { authorization: `Bearer ${token}` } },
      });
      setAnalytics(data ?? undefined);
      setFetched(true);
      fetching.current = false;
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  // There is no need for updating analytics with the server.
  const updateLocalAnalytics = async (newAnalytics: Analytics) => {
    try {
      setAnalytics(newAnalytics);
    } catch (error) {
      console.error("Failed to update tag in cache :", error);
    }
  };
  useEffect(() => {
    if (token && !analytics && !fetching.current) {
      fetching.current = true;
      fetchAnalytics();
    }
  }, [token]);

  return (
    <AnalyticsContext.Provider
      value={{
        fetched,
        analytics,
        updateLocalAnalytics,
        fetchAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within a AnalyticsProvider");
  }
  return context;
};
