import { UserState } from "../types";

interface LogoutAction {
  type: "LOGOUT";
}

interface LoginAction {
  type: "LOGIN";
  payload: UserState;
}

interface LoadingAction {
  type: "LOADING";
  payload: boolean;
}

type AppAction = LoginAction | LogoutAction | LoadingAction;

export type { AppAction };
