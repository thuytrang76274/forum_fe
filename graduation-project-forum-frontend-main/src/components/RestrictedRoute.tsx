import { Navigate } from "react-router";
import { ReactElement } from "react";
import { useAppStore } from "../hooks";

const RestrictedRoute: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const { state } = useAppStore();
  return state.user ? <Navigate to="/" replace /> : children;
};

export default RestrictedRoute;
