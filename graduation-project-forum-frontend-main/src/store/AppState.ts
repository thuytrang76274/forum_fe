import { UserState } from "../dtos";

interface AppState {
  user: UserState | undefined;
}

export default AppState;
