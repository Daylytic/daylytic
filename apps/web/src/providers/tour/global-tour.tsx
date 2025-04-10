/* 

TOURS will be implemented in the future. For now I will have to leave it because of glitching on smaller devices.

*/

import { Tour } from "antd";
import { useNavigate, useLocation } from "react-router";
import { useTour } from "~/providers/tour";

export const GlobalTour = () => {
  const { isTourActive, steps, setTourActive, currentStep, setCurrentStep } = useTour();
  const navigate = useNavigate();
  const location = useLocation();

  const handleStepChange = (current: number) => {
    const step = steps[current];
    setCurrentStep(current);
    
    if (step.type === "navigate" && step.to && location.pathname !== step.to) {
      navigate(step.to);
    }
  };

  return (
    <Tour
      open={isTourActive}
      current={currentStep}
      onClose={() => {
        setTourActive(false);
        setCurrentStep(0);
      }}
      // eslint-disable-next-line
      steps={steps as any}
      onChange={handleStepChange}
    />
  );
};