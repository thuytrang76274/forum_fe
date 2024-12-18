import { ReactElement } from "react";
import { Navigate } from "react-router";
import { useAppStore } from "../hooks";

const PrivateRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { state } = useAppStore();
  return state.user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
