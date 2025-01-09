import { useState, useEffect } from "react";
import { client } from "services/api-client";

export const useGoals = (token: string) => {
  const [goals, setGoals] = useState<any[]>([]);
  const fetchGoals = async () => {
    const { data } = await client.GET("/goals/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setGoals(data ?? []);
  };

  const createGoal = async (goal: {
    title: string;
    description: string;
    deadline: string | null;
    userId: string;
  }) => {
    const { data, error } = await client.POST("/goals/", {
      headers: { Authorization: `Bearer ${token}` },
      body: goal,
    });
    if (error) {
      throw error;
    }
    fetchGoals(); // Refresh goals after creation
    return data;
  };

  useEffect(() => {
    fetchGoals();
  }, [token]);

  return { goals, fetchGoals, createGoal };
};
