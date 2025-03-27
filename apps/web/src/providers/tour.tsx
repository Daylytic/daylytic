import { APP_TOURS, TourStep } from "~/providers/tour/steps";
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Routes } from "~/utils/routes";

interface TourContextType {
  isTourActive: boolean;
  setTourActive: (value: boolean | ((prevState: boolean) => boolean)) => void;
  steps: TourStep[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  startTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider = ({ children }) => {
  const [isTourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const startTour = () => {
    setTourActive(true);
    setCurrentStep(0);
    navigate(Routes.PANEL_DASHBOARD);
  };

  return (
    <TourContext.Provider 
      value={{ 
        isTourActive, 
        setTourActive, 
        steps: APP_TOURS,
        currentStep,
        setCurrentStep,
        startTour
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour must be used within a TourProvider");
  return context;
};