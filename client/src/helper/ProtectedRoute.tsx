import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";

import { type RootState } from "../store/store";

interface Props {
  children: JSX.Element;
  requiredStep: number;
}

const ProtectedRoute = ({ children, requiredStep }: Props) => {
  const currentStep = useSelector((state: RootState) => state.step.currentStep);

  if (currentStep < requiredStep) {
    // Not allowed to access this route yet
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
