// StepContext.tsx
import React, { createContext, useContext, useState } from "react";

// Define the context type
interface StepContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  goToStep: (stepNumber: number) => void;
}

// Create the context with an initial dummy value (will be overridden in provider)
const StepContext = createContext<StepContextType | undefined>(undefined);

// Provider component props
interface StepProviderProps {
  children: React.ReactNode;
}

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [step, setStep] = useState<number>(1); // Initial step

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : 1));
  const resetSteps = () => setStep(1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  return (
    <StepContext.Provider value={{ step, nextStep, resetSteps, goToStep, prevStep }}>
      {children}
    </StepContext.Provider>
  );
};
// Hook to use the step context
export const useStep = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};
