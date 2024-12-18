import { AppAction } from "./actions";
import AppState from "./AppState";

const initState: AppState = {
  user: undefined,
};

function appReducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: undefined,
      };
    default:
      throw new Error("Action does not provided");
  }
}

export { initState };
export default appReducer;
