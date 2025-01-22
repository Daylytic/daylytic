import { Task } from "types/task";
import React, { useContext, useState } from "react";

interface TaskEditorContextType {
  selectedTask: Task | undefined;
  setSelectedTask: (task: Task | undefined) => void;
}

const TaskEditorContext = React.createContext<
TaskEditorContextType | undefined
>(undefined);

// Provider Component
export const TaskEditorProvider = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  return (
    <TaskEditorContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TaskEditorContext.Provider>
  );
};

// Custom Hook to Use Context
export const useTaskEditor = () => {
  const context = useContext(TaskEditorContext);
  if (!context) {
    throw new Error("useTaskEditor must be used within a TaskEditorContext");
  }
  return context;
};
