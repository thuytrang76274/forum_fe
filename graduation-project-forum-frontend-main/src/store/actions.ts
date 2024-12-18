import { User } from "../dtos";

interface LogoutAction {
  type: "LOGOUT";
}

interface LoginAction {
  type: "LOGIN";
  payload: User;
}

interface LoadingAction {
  type: "LOADING";
  payload: boolean;
}

type AppAction = LoginAction | LogoutAction | LoadingAction;

export type { AppAction };
