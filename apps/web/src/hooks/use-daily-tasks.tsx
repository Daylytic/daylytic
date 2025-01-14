import { Task } from "components/panel/content/routine/routine";
import { useEffect, useState } from "react";
import { client } from "services/api-client";

const API_ENDPOINTS = {
  ROUTINE: "/routine/",
};

export const useDailyTasks = (token: string) => {
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

  const createTask = async (title: string) => {
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

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return { tasks, fetchTasks, createTask };
};
