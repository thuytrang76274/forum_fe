import { useReducer } from "react";
import AppContext from "./AppContext";
import appReducer, { initState } from "./appReducer";
import AppState from "./AppState";

const getInitialState = (): AppState => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? { user: JSON.parse(storedUser) } : { user: undefined };
};

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(appReducer, initState, getInitialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
