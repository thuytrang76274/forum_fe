import { createContext } from "react";
import AppState from "./AppState";
import { initState } from "./appReducer";
import { AppAction } from "./actions";

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initState,
  dispatch: () => undefined,
});

export default AppContext;
