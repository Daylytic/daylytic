/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { client } from "services/api-client";
import { Goal, Project } from "types/goal";

interface GoalContextType {
  goals: Goal[];
  selectedGoal: React.MutableRefObject<Goal | undefined>;

  fetched: boolean;
  fetchAll: () => Promise<void>;
  getSelectedGoal: () => Goal | undefined;

  createGoal: (title: string, description: string) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
}

const GoalContext = React.createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ token, children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const selectedGoal = useRef<Goal | undefined>(undefined);

  const [fetched, setFetched] = useState<boolean>(false);

  const { goalId } = useParams();

  const getSelectedGoal = () => goals.find((goal) => goal.id === goalId);

  const fetchAll = async () => {
    try {
      const { data } = await client.GET("/goal/all", {
        params: { header: { authorization: `Bearer ${token}` } },
      });

      const goalsData = data ?? [];
      setGoals(goalsData);

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

  const deleteGoal = async (goalId: string) => {
    try {
      setGoals((prevGoals) => prevGoals.filter((filterGoal) => filterGoal.id !== goalId));

      await client.DELETE("/goal/{goalId}", {
        params: {
          path: { goalId },
          header: { authorization: `Bearer ${token}` },
        },
      });
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateGoal = async (goal: Goal) => {
    try {
      setGoals((prevGoals) =>
        prevGoals.map((existingGoal) => (existingGoal.id === goal.id ? goal : existingGoal)),
      );

      await client.PUT("/goal/", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: goal,
      });
    } catch (error) {
      console.error("Failed to update goal:", error);
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
        selectedGoal,
        fetched,
        fetchAll,
        getSelectedGoal,
        createGoal,
        deleteGoal,
        updateGoal,
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
