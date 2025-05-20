// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { JSX } from "@emotion/react/jsx-runtime";
import { useStep } from "../store/StepContext";

interface Props {
  children: JSX.Element;
  requiredStep: number;
}

const ProtectedRoute = ({ children, requiredStep }: Props) => {
  const { step } = useStep();

  if (step < requiredStep) {
    // Not allowed to access this route yet
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
