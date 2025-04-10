import React, { createContext, useContext, useState } from "react";
import { Task } from "~/types/task";

interface SelectedTaskContextType {
  selectedTask: Task | undefined;
  setSelectedTask: (task: Task | undefined) => void;
}

const SelectedTaskContext = createContext<SelectedTaskContextType | undefined>(undefined);

export const SelectedTaskProvider = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  return (
    <SelectedTaskContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </SelectedTaskContext.Provider>
  );
};

export const useSelectedTask = () => {
  const context = useContext(SelectedTaskContext);
  if (!context) {
    throw new Error("useSelectedTask must be used within a SelectedTaskProvider");
  }
  return context;
};
